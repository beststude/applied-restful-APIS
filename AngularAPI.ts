// albums.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {
  private apiUrl = 'http://localhost:3000/albums';

  constructor(private http: HttpClient) { }

  // Get all albums
  getAlbums(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  // Get single album
  getAlbum(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Add new album
  addAlbum(album): Observable<any> {
    return this.http.post(`${this.apiUrl}`, album);
  }

  // Update album
  updateAlbum(id: string, album): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, album);
  }

  // Delete album
  deleteAlbum(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
// albums.component.ts
import { Component, OnInit } from '@angular/core';
import { AlbumsService } from './albums.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  albums: any[];
  selectedAlbum: any;

  constructor(private albumsService: AlbumsService) { }

  ngOnInit() {
    this.getAlbums();
  }

  // Get all albums
  getAlbums() {
    this.albumsService.getAlbums().subscribe(albums => {
      this.albums = albums;
    });
  }

  // Get single album
  getAlbum(id: string) {
    this.albumsService.getAlbum(id).subscribe(album => {
      this.selectedAlbum = album;
    });
  }

  // Add new album
  addAlbum(album) {
    this.albumsService.addAlbum(album).subscribe(() => {
      this.getAlbums();
    });
  }

  // Update album
  updateAlbum(id: string, album) {
    this.albumsService.updateAlbum(id, album).subscribe(() => {
      this.getAlbums();
    });
  }

  // Delete album
  deleteAlbum(id: string) {
