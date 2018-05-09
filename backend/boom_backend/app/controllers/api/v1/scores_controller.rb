class Api::V1::ScoresController < ApplicationController

    before_action :find_score, only: [:update]
   def index
     scores = Score.all
     render json: scores
   end

   def create
     score = Score.create(score_params)
     render json: score, status: 201
   end

   def update
     @score.update(note_params)
     if @score.save
       render json: @score, status: :accepted
     else
       render json: { errors: @score.errors.full_messages }, status: :unprocessible_entity
     end
   end

   private

   def score_params
     params.require(:score).permit(:bombs_diffused,:bombs_exploded, :user_id)
   end

   def find_score
     @score = Score.find(params[:id])
   end

end
