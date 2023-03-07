export class Ingredient {
    name: string
    category: string
    price: number;
    constructor(name: string, category: string, price: number) {
        this.name = name;
        this.category = category;
        this.price = price;
    }
}

export class Pizza {
    ingredients: Ingredient[];
    name: string;

    constructor(name: string, ingredients: Ingredient[]) {
        this.name = name;
        this.ingredients = ingredients;
    }
}

export class Inventaire {
    ingredients: Map<string, Ingredient>;
    pizzas: Map<string, Pizza>;

    constructor() {
        this.ingredients = new Map();
        this.pizzas = new Map();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.set(ingredient.name, ingredient);
    }

    addPizza(pizza: Pizza) {
        pizza.ingredients.forEach(i => {
            if (!this.ingredients.has(i.name)) {
                throw new Error(`Cannot add pizza named ${pizza.name} - missing ingredient ${i.name}`);
            }

        });
        this.pizzas.set(pizza.name, pizza);
    }

    getIngredient(name: string): Ingredient {
        const res = this.ingredients.get(name);
        if (!res) {
            throw new Error(`No ingredient named '${name}'`);
        }
        return res;
    }

    getPizza(name: string): Pizza {
        const res = this.pizzas.get(name);
        if (!res) {
            throw new Error(`No pizza named '${name}'`);
        }
        return res;
    }

    getPrice(name: string) {
        const pizza = this.getPizza(name);
        let sum = 0;
        pizza.ingredients.map(i => { sum += i.price });
        return sum;
    }
}


