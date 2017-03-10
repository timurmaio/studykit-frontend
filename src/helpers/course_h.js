import API_URL from './config';

let h = {
  getCourses: function() {
    return fetch(API_URL + "api/courses").then(function(response) {
      if (response.status !== 200) {
        console.log("Looks like there is a problem: " + response.status);
        return;
      }
      return response.json();
    });
  }
}

export default h;
