<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;

class CartController extends AbstractController
{

    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
        * @Route("/api/carts/{id}/addProducts", name="api_cart_add_products", methods={"POST"})
    */
    public function addProductsToCart(int $id, Request $request): JsonResponse 
    {
        $data = json_decode($request->getContent(), true);
        //Verify if you receive data
        if (count($data) === 0) {
            return  new JsonResponse(['message' => 'Error']);
        }

        $conn = $this->entityManager->getConnection();
        $sql = 'INSERT INTO "cart_product" ("cart_id", "product_id") VALUES (:id, :productId)';

        //Loop on data to get product id
        foreach ($data as $product) {
            $stmt = $conn->prepare($sql);
            //Insert into db
            $stmt->execute(['id' => $id, 'productId' => $product]);
        }

        return new JsonResponse(['message' => 'Added successfuly' ]);
    }
}
