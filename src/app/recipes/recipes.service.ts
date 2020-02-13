import { Injectable } from '@angular/core';
import { Recipe } from './recipes.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RecipesService {

  recipes: Array<Recipe> = [
    {
      id: '1',
      title: "Burger & Fries",
      imagePath: "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&h=425&w=640",
      ingredients: [
        'Bun',
        'Potatoes',
        'Salt',
        'Spices',
        'Sauce',
        'Salad'
      ]
    },
    {
      id: '2',
      title: "Pizza",
      imagePath: "https://images.pexels.com/photos/803290/pexels-photo-803290.jpeg?auto=compress&cs=tinysrgb&h=480&w=640",
      ingredients: [
        'Bread Base',
        'Mozrella',
        'Salt',
        'Spices',
        'Pizza Sauce',
        'Tomatoes',
        'Onions'
      ]
    }
  ];

  recipesListener = new Subject<Array<Recipe>>();

  constructor() { }

  getRecipes() {
    return [...this.recipes];
  }

  getRecipe(id: string) {
    let recipe = this.recipes.find(recipe => recipe.id == id);
    return {
      ...recipe
    }
  }

  getRecipeListener() {
    return this.recipesListener.asObservable();
  }

  deleteRecipe(id: string) {
    this.recipes = this.recipes.filter(recipe => recipe.id !== id);
    this.recipesListener.next(this.recipes);
  }
}
