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

  def search
    query = params.require(:query)
    search_code = <<-SQL
      SELECT * FROM foods
      WHERE name ILIKE '%#{query}%'
    SQL
    
    search_results = ActiveRecord::Base.connection.execute(search_code)

    render json: {
      search_results: search_results
    }
  end

end
