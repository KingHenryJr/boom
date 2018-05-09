class ScoreSerializer < ActiveModel::Serializer
  attributes :id, :bombs_diffused, :bombs_exploded
  belongs_to :user
end
