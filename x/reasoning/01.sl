ui done. two pages, one to view and select items
another to view order summary

the next page would be the payment.
and technically the app is done.

how? how about the backend? i think that's the next thing?
we need data.

well, before that. how about you implement the state management.

how does the item selection work?

what about routing?

i think i'd implement routing first.
it's really two locations now.

after routing, simulate state management with dummy data.

before backend.

routing done.

now, state management.

what state am i managing?

selected items.
the cart.

let's walk through the use case.

the user selects an item, i want to track that item and the quantity.
and modify the ui of the ProductListItem

for O(1) access, i'd keep a global set of selected item ids
this way, to modify the ui, i'd check if the product id is in select item ids
and change the ui accordingly

what if the user wants to modify item quantity or remove item entirely
when a user selects an item, a dialog appears

the same dialog is useful for modifying quantity
however, removing item is different, perhaps a button

that said, i'd need a different ui for selected items
ui done.

i think i can get started with the state or perhaps implement the ui in the code.
i'd do that.

ui done.
i want to build a functional system with the dummy data then add the backend.
so, i'd need a store.

a zustand store.
what does this store allow me do? manage the cart.

it should contain a global hashmap
productId => OrderItem

this way i know what products are in the cart and can proceed from there.
first off.

for toast, i'd like it to be global.
i'd place it in the app layout and declare a zustand function to trigger it's display.

on second thought, this is uncessary complexity. i'll add the toast to the components that need them. so far, it's a single component. ProductList.

that said, when do i want to show a toast.
when i add items, modify quantity or remove items.


the ui is done, i can add items to cart, modify quantity and remove items from cart. these items persist across pages and i can display an order summary.

what's next? database? backend? i'd say backend. the products, should be retrieved from the backend.

the cart too but this would require a way to identify users.
the products are retrieved from the backend.
so is the cart.

does this mean authentication?


`data persistence, reloading the page shouldn't clear your choices`

what's the question here? a cart is associated with a user.
should a cart be associated with a user or just a session?

the device you ordered with.

what's the end goal? a full system where users place orders.
if we're talking replacing the whatsapp bit then you're pretty much good to go.
feels like you're avoiding the difficulty.

i want to design a mongo db for my retail app.
i know i'd have containers for products and order items.

i think i'm complicating things. for a start, 
design a products api.

then create the admin interface for nihude. perfect the logic for adding items and having it reflect on the user side.

once done, think bout the next thing.