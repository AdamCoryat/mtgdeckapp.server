import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class AnimalsService {
  async findAll(query = {}) {
    let values = await dbContext.Cards.find(query)
      .limit(100)
      .populate("creator")
    return values;
  }

  async findById(id) {
    let card = await dbContext.Cards.findById({
      _id: id,
    });
    if (!card) {
      throw new BadRequest('Invalid Id');
    }
    return card;
  }

  async create(rawData) {
    if (rawData.hasOrg) {
      let data = await dbContext.Cards.create(rawData);
      return data;
    }
    throw new BadRequest('Only Organizations may post new animals.');
  }
  // Makes a call to the database to edit an Animal object then makes a null check before returning data
  async edit(id, creatorEmail, update) {
    let data = await dbContext.Cards.findOneAndUpdate(
      { _id: id, creatorEmail: creatorEmail },
      update,
      { new: true }
    );
    if (!data) {
      throw new BadRequest('Invalid ID or you do not have permissions');
    }
    return data;
  }
  // Makes a call to the database to delete an card object by the objects id then makes an additional call to delete all relationships
  async deleteById(id, creatorEmail) {
    let data = await dbContext.Cards.findByIdAndDelete({
      _id: id,
      creatorEmail: creatorEmail,
    });
    if (!data) {
      throw new BadRequest('Invalid Id or you are not Authorized');
    }
    await dbContext.Favorites.deleteMany({ cardId: id });
  }
}

export const animalsService = new AnimalsService();