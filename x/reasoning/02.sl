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

order items
customer name
address
phone number

i didn't add switch to toggle item availability

`make sure inventory CRUD only accepts valid values`
`CRUD operations should return useful error messages`