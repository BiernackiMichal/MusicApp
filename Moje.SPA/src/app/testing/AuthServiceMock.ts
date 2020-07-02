export class AuthServiceMock {

  isLogged = true;

  decodedToken = {
    unique_name: 'name',
    role: 'role'
  };

  logout(): boolean {
    return this.isLogged;
    }
  }
