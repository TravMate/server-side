<h1>tour guide Routes</h1>   <br>
1- get All Tour guide  (GET)   <br>
http://localhost:3000/guides  <br>
2- get single tour guide  (GET)   <br>
http://localhost:3000/guides/:id   <br>
3- delete tour guide by id   (DELETE)  <br>
http://localhost:3000/guides/:id  <br>
4-filter tour guide  (GET)   <br>
http://localhost:3000/guides/search?minPrice=50&maxPrice=170&rating=4&guideType=Historical&language=English  <br>
5-add review to tour guide (POST)  <br>
http://localhost:3000/guides/:id/addReview  <br>
6- remove review from tour guide (DELETE)  <br>
http://localhost:3000/guides/:tourguideId/review/:reviewId  <br>
7-add car to tour guide (PUT)   <br>
http://localhost:3000/guides/:tourguideId/car   <br>
8- remove car from tour guide (DELETE)    <br>
http://localhost:3000/guides/:tourguideId/car/:carId
<h1>cities Routes </h1>



