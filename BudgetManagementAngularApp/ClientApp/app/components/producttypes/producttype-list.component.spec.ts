import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTypeListComponent } from './producttype-list.component';

describe('ProductTypeListComponent', () => {
    let component: ProductTypeListComponent;
    let fixture: ComponentFixture<ProductTypeListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProductTypeListComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductTypeListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
