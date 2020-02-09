import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipes.model';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit, OnDestroy {

  recipe: Recipe;
  id: string;
  recipeSub: Subscription;

  constructor(private recipeService: RecipesService, private route: ActivatedRoute, private router: Router, private AlertCtrl: AlertController) { }

  ngOnInit() {

    this.recipeSub = this.route.params
      .subscribe(
        (params: Params) => {
          if (!params['recipeID'])
            this.router.navigate(['.']);
          else
            this.id = params['recipeID'];
        }
      );

    this.recipe = this.recipeService.getRecipe(this.id);
  }

  deleteRecipe(id: string) {

    this.AlertCtrl.create({
      header: 'Are you sure?', message: "Do you really want to delete the recipe?", buttons: [
        {
          text: "Cancel",
          role: "cancel"
        },
        {
          text: "Delete",
          handler: () => {
            this.recipeService.deleteRecipe(id);
            this.router.navigate(['.']);
          }
        }
      ]
    })
      .then(
        (ctrlElement) => {
          ctrlElement.present();
        }
      )
  }

  ngOnDestroy() {
    this.recipeSub.unsubscribe();
  }
}
