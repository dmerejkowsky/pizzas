import { Inventaire, Ingredient, Pizza } from './pizza'
import test from 'tape'

test('déclaration d\'un ingrédient ', t => {
    const sauceTomate = new Ingredient('sauce tomate', 'sauce', 1);

    t.equal(sauceTomate.name, "sauce tomate");
    t.equal(sauceTomate.price, 1);

    t.end();
})



test('les ingredients sont dans un inventaire', (t) => {
    const inventaire = new Inventaire();
    const sauceTomate = new Ingredient('sauce tomate', 'sauce', 1);
    const mozzarella = new Ingredient('mozarella', 'fromage', 2);
    inventaire.addIngredient(sauceTomate);
    inventaire.addIngredient(mozzarella);
    let found = inventaire.getIngredient('sauce tomate');
    t.deepEqual(found, sauceTomate);
    t.end();
})

test('leve une exception quand l\'ingredient n\'est pas present', (t) => {
    const inventaire = new Inventaire();
    t.throws(() => inventaire.getIngredient('tomate'));
    t.end();
})

test("ajout d'une pizza basique dans l'inventaire", (t) => {
    const inventaire = new Inventaire();
    const sauceTomate = new Ingredient('sauce tomate', 'sauce', 1);
    const mozzarella = new Ingredient('mozarella', 'fromage', 2);

    inventaire.addIngredient(sauceTomate);
    inventaire.addIngredient(mozzarella);
    const basique = new Pizza('basique', [sauceTomate, mozzarella]);
    inventaire.addPizza(basique);

    const found = inventaire.getPizza('basique');
    t.deepEqual(found, basique);
    t.end();
})

test("leve une exception a l'ajout d'une pizza quand il manque des ingredients", (t) => {
    const inventaire = new Inventaire();
    const sauceTomate = new Ingredient('sauce tomate', 'sauce', 1);
    const mozzarella = new Ingredient('mozarella', 'fromage', 2);

    inventaire.addIngredient(sauceTomate);

    const basique = new Pizza('basique', [sauceTomate, mozzarella]);
    t.throws(
        () => {
            inventaire.addPizza(basique)
        },
        /missing ingredient/
    );
    t.end();
})

test('calcul du prix de la quatre fromages', t => {
    const inventaire = new Inventaire();
    const ingredients = [
        new Ingredient('sauce tomate', 'sauce', 1),
        new Ingredient('mozarella', 'fromage', 2),
        new Ingredient('fromage de chèvre', 'fromage', 4),
        new Ingredient('emmental', 'fromage', 2),
        new Ingredient('Fourme D\'Ambert AOP', 'fromage', 4),
    ];
    ingredients.forEach(i => inventaire.addIngredient(i));

    const quatreFromages = new Pizza('quatre fromages', ingredients);
    inventaire.addPizza(quatreFromages);

    const price = inventaire.getPrice('quatre fromages');

    t.equal(price, 13);
    t.end();
})