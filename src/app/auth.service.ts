import { Injectable, signal } from '@angular/core';

interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = signal<User | null>(null);

  constructor() {
    // Beim Start der Anwendung prüfen, ob ein Benutzer im localStorage gespeichert ist
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser.set(JSON.parse(storedUser));
    }
  }

  login(email: string, password: string): boolean {
    // In einer echten Anwendung würden Sie hier eine API-Anfrage zur Überprüfung der Anmeldedaten senden
    // Für dieses Beispiel nehmen wir an, dass jede E-Mail/Passwort-Kombination gültig ist
    const user: User = { email, password };
    this.currentUser.set(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    return true;
  }

  logout(): void {
    this.currentUser.set(null);
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return this.currentUser() !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUser();
  }
}