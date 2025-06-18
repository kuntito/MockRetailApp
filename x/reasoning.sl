******************
what do i want to build?
what am i building? a retail store app

okay...

forget title and let's work with descriptions.

i need an app, actually, a system.

a system with an inventory.

again.. forget titles
descriptions.

the app should display a list of items
the user should be able to select `n` units of an item and add to a basket
okay, this means the app would need an inventory
a storage for all the items and from that storage, we'd display items for selection

perhaps, we can start with the inventory
what do we need?

the inventory is a collection of items.
perhaps, i should describe the properties of each item.

minimal properties.
each item would need:

id
name
price

that's as minimal as we can get.

i can store this in a db. jumping the gun, i'm using MongoDB.
i watched a MERN tutorial where the tutor uploaded the website
and want to follow his steps.

using another tech stack, would require another tutorial or worse,
me figuring things out for myself. i'd rather not.

how exactly does MongoDB work? let's leave code for now.

and work on system requirements. or maybe the UI interface?
one thing at a time.

say i have my inventory. what's next?
the user interface? what user interface?

there's two generic users, the Admin and the Customer.
therefore, i'd need two user interfaces.

i'd work on the customer interface first and have that define the requirements
for the admin interface.

the entire system MUST have a customer interface, the admin may or may not exist.
let's see.

what does the customer need:

select items
pay for items

is that all they need? select items and make payment.
for an mvp, i'd say so.

select items would have sub actions like modify items, delete items but it's one container of user interaction.

so what's the first step? 

design customer user flows?
might be a good place to start.

what does a customer need. select items and payments.

one at a time. select items.
you want to display the items.


when they select an item. what happens?
a dialog appears where they can select quantity and add to cart.

after adding an item, what happens.
the cart badge is updated and the ui of the item changes.
make the selected items prominent, perhaps bolder font.

what if a user selects a selected item, the same dialog appears
but this time prepopulated with the items

itemDisplayScreen
    item
    addOrderItemDialog

anything else that screen would need?
let's start the design and proceed from there.

what would the item look like?

a row, item name and price on the right.

basic select item workflow is done.
next up is checkout flow

once they click the cart, they can check out items.

what is the checkout page? an order summary
and the intermediary before the payments

what would an order summary need?
the list of order items
and total price.

***
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
***
products Api done.

i want to create the admin UI for nihude.

what's the primary job? what does the admin need to do?

she needs to manage items.

add new items.
remove items.
edit items.

can she view orders, i guess she should.
no guess, she manages items.
items get displayed on customer end.

if customer makes an order, it should appear on her screen
one thing i did in the previous version is i allowed items to be disabled.

let's implement the admin interface.

first screen two buttons.

add new item.

manage existing items.

forget two screens.
one screen.

a list of items.
with a switch to indicate which item is available.

for adding new items, use a floating action button.

`finish admin interface`

what else does the admin need?
she can manage inventory, users can view inventory and add items to cart
after they pay, an order is made.

then she receives the order.
so admin page needs to view orders

next step: design view orders page
what does she need?
to see the orders
does she mark the orders as complete? yes
what happens then, she completed orders go in a pile

i'm thinking of a tab layout
pending orders, completed orders
once she marks an order as complete, it goes into the completed pile
what if she makes a mistake and marks an order as complete
she can go to completed orders and undo...

this is implementation logic, not design.
we'd have two tabs.

aii, pending orders.
what does the order look like?
what does she need?

`
customer name
phone number
address
order items
`

user authentication is a different beast.
for a v1, i need a way for her to display the items.
when users make an order, she receives a whatsapp message.

the goal right now is to replace the lengthy item list she has on whatsapp.
this way, the customers can see what items they need at a glance
and make an order.

it'd probably be a bad UX, since having a -
just do the work, man.


`make sure inventory CRUD only accepts valid values`
`CRUD operations should return useful error messages`


***
i'm starting over.
made an error with the data models.
i defined OrderItem without considering how it'd integrate into the Order model.

every order item must be part of an order.
let's jump into it.

first, i need a Product model.

next i need an OrderItem model.

i need a cart model? don't know if this is necessary.
last iteration, i used a hashmap i.e. orderItemId => OrderItem
and i didn't have any issues

i'd need an Order model.
this model contains info bout the order like
customer name, address, phone number
i'm thinking to not include individual order items
the way it'd work is, OrderItem, would have a nullable orderId property
once an order is made, all order items are given the same orderId

and an Order object is created.
this way i can pass the Order object around without passing it's items
if i need the items, i'd query the storage with the specific order id
and grab the items.

might need to ensure OrderItems don't exist without an order
and order doesn't exist without items. for now, i want to build the UI with dummy data.
then add API calls.

also, i want to deliver this soon. i don't want to worry about user authentication.
to make things simple, the user enters their address and phone number at the time they place their order.
they shouldn't be able to place an order without phone number. this way, nihude, the store owner can
reach them.

implementing authentication can take time and add on complexity. the system can work without it.
i'd also have to implement the payment feature, for now, a dummy button to place order
which would create the order.

* claude thinks it looks good, i'd start off defining the models

reet, i want to define the payment page.
the succesful payment indicates an order has been made.
the business model is customer makes orders, nihude, the store owner delivers to their houses.

there's two parts to making an order.

the customer info,
name
address
phone number

card details,
name on card
card number
expiry date
CVV code


both things are instrumental in making an order.
at this point of the app, the user must have selected items.

once payment is made, nihude gets a notification with the customers order. i understand the best UX is to have customers register so they only enter their details once, but implementing a customer feature would put back the project delivery date.

i want to get this done as soon as possible. so no registration right now, any one who wants to order would have to add their name, address and phone number before ordering.

now, i need to implement three pages.

one where i collect customer info
one where i collect their card details
one where i indicate successful payment

i don't want to bother about transaction errors right now.