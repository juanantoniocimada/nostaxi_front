

ng g s services/trip
ng g c pages/searching
ng g c pages/driver-register

kill -9 $(lsof -t -i:4200)


- getAssignedDriver endpoint que devuelve taxista mas cerca