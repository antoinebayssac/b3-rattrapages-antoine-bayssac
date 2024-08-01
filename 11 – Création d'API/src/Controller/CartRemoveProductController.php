<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;

class CartRemoveProductController extends AbstractController
{
  

    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
        * @Route("/api/carts/{cartId}/product/{productId}", name="api_cart_remove_product", methods={"DELETE"})
    */
    public function removeProductFromCart(int $cartId,  int $productId): JsonResponse 
    {

        //Verify if data exists
        if (empty($cartId) or empty($productId)) {
            return new JsonResponse(['error' => 'Error'], 404);
        }

        $conn = $this->entityManager->getConnection();
        $sql = 'DELETE FROM "cart_product" WHERE "product_id" = :product_id AND "cart_id" = :cart_id';

        try {
            $stmt = $conn->prepare($sql);
            //Remove from db the row
            $stmt->execute(['cart_id' => $cartId,'product_id' => $productId]);
        } catch (Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], 500);
        }
        return new JsonResponse(['message' => 'Product has been removed.']);
    } 
}
