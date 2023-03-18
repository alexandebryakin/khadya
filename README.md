# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

# Pages:

```yml
TODO:
  - seeds
  - generate anonumous user

  - page: signin
  - page: signup
  - page: restaurant
  - page: menu

  - layout: bottom_panel

Pages:
  Explore: !DEFAULT Search/Filter restaurants
    path: /
  Restaurant:
    path: /restaurant/:restaurantId
    example: https://www.airbnb.co.in/rooms/605371928419351152
    elements:
      - BOTTOM:
          - the navigation replaces itself with a button smth like `Choose Table` or `Order`?

      - image carousel
      - section: amenities (What this place offers)
      - section: tables (Where you'll sit)
          - table carousel
              - image:
              - name: Table 1
              - seats: 4 seats
              onClick:
                - table page opens:
                    - table image:
                    - table info: name, num. of seats
                    - CTA: Start # Or any other name to start session
                        onClick:
                          - open restaurant's menu page:
                            # /restaurant/:restaurantId/menu/:menuId/session/:sessionId
                            # /restaurant/:restaurantId/table/:tableId/session/:sessionId/menu/:menuId
                            # --OR--
                            # /restaurant/:restaurantId/menu/:menuId?sessionId=uuid

      - section: location on the map
      - section: reviews
          - review carousel
    Menu:
      path?: /restaurant/:restaurantId/menu/:menuId
      elements:
        - tabs?:
            - welcome:
                - Welcome to {restaurant.name}
                - CTA: See Meals # or any other better name
                    onClick: changes tab to 'menu'
            - menu:
                - Restaurant Image?
                - Restaurant Name
                - Scroller with some tags like [beverages, ...etc]
                - the list of meals:
                    meal card:
                      - image:
                      - name:
                      - price:
                      onClick:
                        - meal page opens:
    Meal:
      comments:
        - based on the scenario the page might appear differently:
            - when user just lists through the menu
            - when user selects a meal during session

      path:

  Profile:
    - Become an owner: -> makes you a restaurant owner
    -


Paths:
  /:
  /restaurant/:restaurantId:
  /restaurant/:restaurantId/menu/:menuId:
  /restaurant/:restaurantId/reviews:
  /restaurant/:restaurantId/tables:
  /restaurant/:restaurantId/table/:tableId:
  /restaurant/:restaurantId/table/:tableId/session/new:


Components:
  - Popup: https://mobile.ant.design/components/popup
  - TabBar (BottomMenu): https://mobile.ant.design/components/tab-bar
  - Badge: https://mobile.ant.design/components/badge
  - SwipeAction: https://mobile.ant.design/components/swipe-action
  - PullToRefresh: https://mobile.ant.design/components/pull-to-refresh
  - Switch: https://mobile.ant.design/components/switch
  - Swiper (For Photos): https://mobile.ant.design/components/swiper
  - FloatingPanel (For things like in Google Maps when you want to see more details about selected place):
      - https://mobile.ant.design/components/floating-panel
```
