const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../index');

const should = chai.should();

// This let's us make HTTP requests in our tests.
// see: https://github.com/chaijs/chai-http
chai.use(chaiHttp);

describe('Newco Server Unit Tests', function(){
  before(function(){
    return runServer();
  })

  after(function(){
    return closeServer();
  });

  it('Verify server with Hello World on GET', function(){
    return chai.request(app)
    .get('/')
    .then(function(res){
      res.should.have.status(200);
    });
  });

  // it('should add a new record on POST', function(){
  //   const newBlog = {title:"test", content:"integration test on POST", author:"author1", publishDate:"10/5/2017"}
  //   return chai.request(app)
  //   .post('/blog-posts')
  //   .send(newBlog)
  //   .then(function(res){
  //     res.should.have.status(201);
  //     res.should.be.json;
  //     res.body.should.be.a('object');
  //     res.body.id.should.be.not.null;
  //     res.body.should.include.keys('id', 'title', 'content', 'author', 'publishDate');
  //   });
  // });

  // it('should update a record on PUT', function(){
  //   const updateBlog = {
  //     title: "test2", 
  //     content: "integration test on POST update", 
  //     author: "author1", 
  //     publishDate: "10/5/2017"
  //   };
  //   return chai.request(app)
  //   .get('/blog-posts')
  //   .then(function(res){
  //     updateBlog.id = res.body[0].id;
  //     console.log(updateBlog);
  //     return chai.request(app)
  //     .put(`/blog-posts/${res.body[0].id}`)
  //     .send(updateBlog)
  //     .then(function(res){
  //       res.should.have.status(204);
  //     });
  //   }) 
  // });

  // it('should delete a record on DELETE', function(){
  //   return chai.request(app)
  //   .get('/')
  //   .then(function(res){
  //     return chai.request(app)
  //     .delete(`/blog-posts/${res.body[0].id}`)
  //     .then(function(res){
  //       res.should.have.status(204);
  //     });
  //   }) 
  // });

});
