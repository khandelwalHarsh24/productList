import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { SelectproductService } from 'src/app/services/selectproduct.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  

  constructor(private productService: ProductsService,private selectedProductsService: SelectproductService,private route: ActivatedRoute,
    private userService: UserService){}

  products: any[] = [];

  userData: any={};

  userId: any;

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data)=>{
      this.products=data;
    })

    this.route.params.subscribe(params => {
      this.userId = params['id'];
    });

    this.loadSingleUser();
  }
  // Pagination variables
  pageSize = 5;
  currentPage = 1;

  // Calculate the total number of pages
  get totalPages(): number {
    return Math.ceil(this.products.length / this.pageSize);
  }

  // Slice the products array based on the current page
  get displayedProducts(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.products.slice(startIndex, endIndex);
  }


  changePage(increment: number): void {
    this.currentPage += increment;
    if (this.currentPage < 1) {
      this.currentPage = 1;
    } else if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
  }

  selectProduct(product:any){
    // console.log(this.userId);
    this.productService.selectProduct(product._id,this.userId).subscribe((data)=>{
      console.log(data);
      this.loadSingleUser();
    })

  }

  deselectProduct(product:any){
    this.productService.deselectProduct(product._id,this.userId).subscribe((data)=>{
      console.log(data);
      this.loadSingleUser();
    })
  }

  isSelected(productId:any){
    if(this.userData.selectedProducts.includes(productId)) return true;
    return false;
  }


  loadSingleUser(){
    this.userService.getSingleUser(this.userId).subscribe(data=>{
      this.userData=data; 
      console.log(this.userData);
    })
  }
}
