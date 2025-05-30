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