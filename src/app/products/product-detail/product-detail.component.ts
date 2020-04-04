import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { map, filter, flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  @Input() product: Product;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) { }

  delete(id: number) {
    if (window.confirm('Are you sure ??')) {
      this
      .productService
      .deleteProduct(id)
      .subscribe(
        () => {
          console.log('Product deleted!');
          this.productService.initProducts();
          this.router.navigateByUrl('/products');
        },
        error => console.log('Could not delete product ' + error)
      )
    }
  }

  ngOnInit(): void {
    const id = + this.activatedRoute.snapshot.params['id'];
    this
      .productService
      .products$
      .pipe(
        flatMap(p => p),
        filter(product => product.id === id)

       // map(products => products.find(p => p.id === id))
      )
      .subscribe(
        result => this.product = result
      )
  }

}
