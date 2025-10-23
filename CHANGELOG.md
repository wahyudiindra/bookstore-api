# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### 0.0.2 (2025-10-23)


### Features

* **auth:** handling user can signin using one device ([2448b0b](https://github.com/wahyudiindra/bookstore-api/commit/2448b0b1dd1255a43bf50ffd6ce125e83826ad8a))
* **auth:** masking password on response data ([920b80b](https://github.com/wahyudiindra/bookstore-api/commit/920b80bbc8ccbfa660242c7a171fe2200d63bd17))
* **auth:** set login attempt using redis ([5f3e2a3](https://github.com/wahyudiindra/bookstore-api/commit/5f3e2a3af8d21ec7fbb171739d876f0efc38dca0))
* **auth:** set signin with jwt ([7883b7c](https://github.com/wahyudiindra/bookstore-api/commit/7883b7c350d5730fd76a5d628afe0ff3ca9ddb6f))
* **base:** set base repository for CRUD ([1494238](https://github.com/wahyudiindra/bookstore-api/commit/149423897e5c0dc0a16c7aa604e007d6da600378))
* **book:** create new book as admin ([abe77ee](https://github.com/wahyudiindra/bookstore-api/commit/abe77ee7cf878770a37e76faaf8497ea0bc0f974))
* **book:** provide detail book for admin and customer ([0f89e7f](https://github.com/wahyudiindra/bookstore-api/commit/0f89e7f864ea3eb7e7701a5f366c4b867aac7aa1))
* **book:** provide list books for admin and customer ([5f35b06](https://github.com/wahyudiindra/bookstore-api/commit/5f35b06b9b94cc1dd5f661072d1405440fdd2ba1))
* **book:** provide report on get detail book ([6faf3bb](https://github.com/wahyudiindra/bookstore-api/commit/6faf3bb9b3dceb3932d3092af5156230622f8c42))
* **book:** provide report per book for admin ([9e8b655](https://github.com/wahyudiindra/bookstore-api/commit/9e8b655d04dcbfc8b80b22bfb49089b40a5f1d09))
* **book:** update book as admin (including only update stock) ([7eca88c](https://github.com/wahyudiindra/bookstore-api/commit/7eca88c9f77bb9fd436c2a7e5e40c9ec07ec769c))
* **cart:** create cart as customer ([e4d9e57](https://github.com/wahyudiindra/bookstore-api/commit/e4d9e57a2c7e21533f03b8597cf91170aefcec88))
* **cart:** provide list carts for customer ([c7059ce](https://github.com/wahyudiindra/bookstore-api/commit/c7059ceb7c73640c9049be2e24fc6937b9d811ea))
* **cart:** update qty of cart (includie delete cart) ([dc575b0](https://github.com/wahyudiindra/bookstore-api/commit/dc575b005697ab7f0cfcf1a2c29f6027fd2edfdb))
* **error handling:** set error logging save to db ([f9d7f8f](https://github.com/wahyudiindra/bookstore-api/commit/f9d7f8fc845f6006d2bd777b81110c354ab134fd))
* **error handling:** set exception filter to handle error ([5388ec1](https://github.com/wahyudiindra/bookstore-api/commit/5388ec1fdf967205dfdd0680a7572ec6b9499301))
* **rate limiter:** define throttle on app ([51bdfbe](https://github.com/wahyudiindra/bookstore-api/commit/51bdfbef9ae63eb47c3f501e6362a96be8625681))
* **schema:** init prisma and create user table migration ([77773c8](https://github.com/wahyudiindra/bookstore-api/commit/77773c8399005c41246a9e83b4b33dd9966bb9d4))
* **schema:** set migration for create book table ([eb0e4bc](https://github.com/wahyudiindra/bookstore-api/commit/eb0e4bc20bcfb7383be836f7f0afc394c988b559))
* **schema:** set migration for create cart table ([7f54163](https://github.com/wahyudiindra/bookstore-api/commit/7f54163cd4532649546bd00f4591557a09d94f9e))
* **schema:** set migration for create transaction table ([cd399a1](https://github.com/wahyudiindra/bookstore-api/commit/cd399a16d7ce4a4c852890ff8b0ce6ed9025c7ab))
* **transaction:** create transaction based on carts ([69a7ce0](https://github.com/wahyudiindra/bookstore-api/commit/69a7ce0aaed274d409a5d4451e959fbc3da3da29))
* **transaction:** handling race condition ([d7a00a2](https://github.com/wahyudiindra/bookstore-api/commit/d7a00a2abcaa68f11d8c1be37cdda7bbc52a3da6))
* **transaction:** provide detail transaction to admin and customer ([d1d397e](https://github.com/wahyudiindra/bookstore-api/commit/d1d397e64b2d1acbbe38e8aa773aa62f66d49182))
* **transaction:** provide list transactions to admin and customer ([4d7c4ce](https://github.com/wahyudiindra/bookstore-api/commit/4d7c4ce46ea0f2f58a287e323102d17d1133f85c))
* **transaction:** set payment callback ([dc292a8](https://github.com/wahyudiindra/bookstore-api/commit/dc292a880bffffb9a62a2cb7259d7d4e603009da))
* **user:** provide data of logged user ([474506e](https://github.com/wahyudiindra/bookstore-api/commit/474506e275b7327a0a9f052e5ff961f1b8f79bbf))
* **user:** provide list users for admin ([bda05b7](https://github.com/wahyudiindra/bookstore-api/commit/bda05b73511b314f72d5b9142bac43abe4e7ca24))


### Bug Fixes

* **schema:** set mapping some data on cart table ([911e3db](https://github.com/wahyudiindra/bookstore-api/commit/911e3db5cb9e42f5e8cc2f593d7b352221c9d4bc))
