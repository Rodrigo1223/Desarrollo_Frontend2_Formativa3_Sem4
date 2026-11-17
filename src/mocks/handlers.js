import { http, HttpResponse, delay } from 'msw';

const booksByGenre = {
  'Ficcion': [
    { id: 1, title: 'Cien Años de Soledad', author: 'Gabriel García Márquez', price: '$12.990' },
    { id: 2, title: 'Don Quijote de la Mancha', author: 'Miguel de Cervantes', price: '$14.990' },
    { id: 3, title: '1984', author: 'George Orwell', price: '$11.500' },
  ],
  'CienciaFiccion': [
    { id: 4, title: 'Dune', author: 'Frank Herbert', price: '$16.990' },
    { id: 5, title: 'Neuromante', author: 'William Gibson', price: '$13.500' },
  ],
  'Misterio': [
    { id: 6, title: 'El nombre de la rosa', author: 'Umberto Eco', price: '$15.990' },
  ],
  'Drama': [], // Categoría vacía para probar estado sin resultados (requisito de manejo de datos vacíos)
};

export const handlers = [
  http.get('/api/books', async ({ request }) => {
    const url = new URL(request.url);
    const genre = url.searchParams.get('genre');

    // Simula 1 segundo de retraso para verificar el indicador de carga (loading)
    await delay(1000);

    const books = booksByGenre[genre];

    if (!books) {
      return HttpResponse.json(
        { message: `La categoría "${genre}" no existe.` },
        { status: 404, statusText: 'No encontrado' }
      );
    }

    return HttpResponse.json(books);
  }),
];