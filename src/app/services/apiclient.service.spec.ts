import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { APIClientService } from './apiclient.service';
import { Post } from '../model/post';

describe('APIClientService (Integración con JSON Server)', () => {
  let service: APIClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [APIClientService]
    });
    service = TestBed.inject(APIClientService);
  });

  it('Debería obtener todos los posts desde JSON Server', async () => {
    const posts = await service.fetchPosts();
    
    expect(posts).withContext('No se obtuvieron publicaciones correctamente desde el servidor JSON').toBeTruthy();
    expect(posts.length).withContext('No se encontraron publicaciones en el servidor JSON').toBeGreaterThan(0);

    const firstPost = posts[0];
    expect(firstPost).toBeDefined();
    expect(firstPost).toEqual(jasmine.objectContaining({
      id: jasmine.any(String),
      title: jasmine.any(String),
      body: jasmine.any(String),
      author: jasmine.any(String),
      date: jasmine.any(String),
      authorImage: jasmine.any(String),
    }));

    alert('Todas las publicaciones fueron leidas');
  });
  
  it('Debería crear un nuevo post en JSON Server', async () => {
    //service = TestBed.inject(APIClientService);
    
    const newPost = {
      id: -1,
      title: "Publicación de Prueba",
      body: "Contenido nuevo",
      author: "Juan Pérez",
      date: "13/11/2024",
      authorImage: "https://example.com/images/autor_prueba.jpg"
    };

    const createdPost = await service.createPost(newPost);

    expect(createdPost).toBeTruthy();
    if (createdPost) {
      expect(createdPost!.title).toEqual(newPost.title);
      expect(createdPost!.body).toEqual(newPost.body);
      expect(createdPost!.author).toEqual(newPost.author);
      expect(createdPost!.date).toEqual(newPost.date);
      expect(createdPost!.authorImage).toEqual(newPost.authorImage);
    }

    alert(`Fue creado el post ${createdPost!.id}`);
  });

  it('Debería actualizar un post existente en JSON Server', async () => {
    const updateData = {
      id: 1,
      title: `Publicación de Prueba Actualizada ${Math.floor(Math.random() * 1000)}`,
      body: "Contenido actualizado",
      author: "Juan Pérez",
      date: "14/11/2024",
      authorImage: "https://example.com/images/autor_prueba.jpg"
    };

    const updatedPost = await service.updatePost(updateData); // Aquí usamos el id 1 como ejemplo

    expect(updatedPost?.title).toEqual(updateData.title);

    alert(`Fue actualizada la publicación: "${updatedPost?.title}"`);
  });

  it('Debería eliminar un post en JSON Server', async () => {
    const deleteResponse = await service.deletePost(2); // Aquí usamos el id 10 como ejemplo
    debugger
    expect(deleteResponse).toBeDefined();
    expect(deleteResponse).toBeTruthy();

  });

});
