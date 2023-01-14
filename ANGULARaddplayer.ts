import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-players-queries',
  templateUrl: './players-queries.component.html',
  styleUrls: ['./players-queries.component.css']
})
export class PlayersQueriesComponent implements OnInit {

  player = { name: '', position: '', team: '' };
  query = {};

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  addPlayer() {
    this.http.post('/api/players', this.player).subscribe(res => {
      console.log(res);
    });
  }

  updatePlayer() {
    this.http.put('/api/players/' + this.player._id, this.player).subscribe(res => {
      console.log(res);
    });
  }

  deletePlayer(id) {
    this.http.delete('/api/players/' + id).subscribe(res => {
      console.log(res);
    });
  }

  query1() {
    this.http.get('/api/players/query1', { params: this.query }).subscribe(res => {
      console.log(res);
    });
  }

  query2() {
    this.http.get('/api/players/query2', { params: this.query }).subscribe(res => {
      console.log(res);
    });
  }

  query3() {
    this.http.get('/api/players/query3', { params: this.query }).subscribe(res => {
      console.log(res);
    });
  }

  query4() {
    this.http.get('/api/players/query4', { params: this.query }).subscribe(res => {
      console.log(res);
    });
  }

  query5() {
    this.http.get('/api/players/query5', { params: this.query }).subscribe(res => {
      console.log(res);
    });
  }
}
