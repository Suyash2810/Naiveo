import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FollowPagePage } from './follow-page.page';

describe('FollowPagePage', () => {
  let component: FollowPagePage;
  let fixture: ComponentFixture<FollowPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FollowPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
