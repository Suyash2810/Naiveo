import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from './recipes.model';
import { RecipesService } from './recipes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit, OnDestroy {

  recipes: Recipe[] = [];
  recipesSubscription: Subscription;

  constructor(private recipeService: RecipesService) { }

  ngOnInit() {

    this.recipes = this.recipeService.getRecipes();

    this.recipesSubscription = this.recipeService.getRecipeListener()
      .subscribe(
        (recipes) => {
          this.recipes = recipes;
        }
      )
  }

  ngOnDestroy() {
    this.recipesSubscription.unsubscribe();
  }

}
