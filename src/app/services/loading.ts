import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingSignal {

  loading = signal<any>(null);

  getLoading() {
    return this.loading();
  }

  setLoading(data: any) {
    this.loading.set(data);
  }

}
