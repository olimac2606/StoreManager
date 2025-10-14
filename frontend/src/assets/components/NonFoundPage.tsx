// src/pages/NotFoundPage.tsx
import {
  Box,
  Heading,
  Text,
  Button,
  Stack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {

  return (
    <Box
      role="main"
      minH="100dvh"
      display="grid"
      placeItems="center"
      px={{ base: 4, sm: 6 }}
      py={{ base: 12, sm: 16 }}
    >
      <Box
        maxW="lg"
        w="full"
        rounded="2xl"
        shadow="lg"
        p={{ base: 6, sm: 10 }}
        textAlign="center"
      >
        <Text
          as="span"
          fontSize="sm"
          fontWeight="semibold"
          color="green.500"
          letterSpacing="wider"
        >
          Error 404
        </Text>

        <Heading mt={2} size="lg">
          Página no encontrada
        </Heading>

        <Text mt={2}>
          Lo sentimos, no pudimos encontrar la ruta que buscabas.
          Verifica la URL o vuelve al inicio.
        </Text>

        <Stack
          direction={{ base: "column", sm: "row" }}
          justify="center"
          mt={6}
        >
        <Link to="/">
          <Button colorPalette={'green'}>
            Ir al inicio
          </Button>
        </Link>
        </Stack>
      </Box>
    </Box>
  );
}
