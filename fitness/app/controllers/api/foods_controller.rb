class Api::FoodsController < ApplicationController
  def index
    @foods = Food.all
    if @foods
      render json: {
        foods: @foods
      }
    else
      render json: {
        status: 500,
        errors: ['no foods available']
      }
    end
  end
end
