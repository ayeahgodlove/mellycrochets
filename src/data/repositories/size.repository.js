import { NotFoundException } from "../../exceptions/not-found.exception";
import { Crochet, Size } from "../entities";

export class SizeRepository {
  constructor() {}

  /**
   * Receives a Size as parameter
   * @size
   * returns void
   */
  async create(size) {
    try {
      return await Size.create({ ...size });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @id
   * returns Size
   */
  async findById(id) {
    try {
      const sizeItem = await Size.findByPk(id, {
        include: [
          {
            model: Crochet,
            as: "crochets",
            through: {
              attributes: ["price", "stock"],
            },
          },
        ],
      });

      if (!sizeItem) {
        throw new NotFoundException("Size", id);
      }
      const formattedSizeItem = {
        ...sizeItem.get(), // Convert Sequelize instance to plain JSON
        crochets: sizeItem.crochets.map((crochet) => ({
          ...crochet.get(), // Convert each crochet instance to plain JSON
          imageUrls: crochet.imageUrls ? JSON.parse(crochet.imageUrls) : [], // Corrected parsing
          price: crochet.CrochetSize?.price,
          stock: crochet.CrochetSize?.stock,
        })),
      };

      return formattedSizeItem;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @title
   * returns Size
   */
  async findByTitle(title) {
    try {
      const sizeItem = await Size.findOne({
        where: { title },
        include: [
          {
            model: Crochet,
            as: "crochets",
            through: {
              attributes: ["price", "stock"],
            },
          },
        ],
      });

      const formattedSizeItem = {
        ...sizeItem.get(), // Convert Sequelize instance to plain JSON
        crochets: sizeItem.crochets.map((crochet) => ({
          ...crochet.get(), // Convert each crochet instance to plain JSON
          imageUrls: crochet.imageUrls ? JSON.parse(crochet.imageUrls) : [], // Corrected parsing
          price: crochet.CrochetSize?.price,
          stock: crochet.CrochetSize?.stock,
        })),
      };

      return formattedSizeItem;
    } catch (error) {
      throw error;
    }
  }

  /*
   * Returns an array of Size
   */
  async getAll() {
    try {
      const sizes = await Size.findAll({
        include: [
          {
            model: Crochet,
            as: "crochets",
            through: {
              attributes: ["price", "stock"],
            },
          },
        ],
      });
      const formattedSizes = sizes.map((size) => {
        const plainSize = size.get({ plain: true }); // Convert to plain object

        return {
          ...plainSize,
          crochets: plainSize.crochets.map((crochet) => ({
            ...crochet,
            imageUrls: crochet.imageUrls ? JSON.parse(crochet.imageUrls) : [], // Parse imageUrls
            price: crochet.CrochetSize?.price, // Include price and stock
            stock: crochet.CrochetSize?.stock,
          })),
        };
      });
      return formattedSizes;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a Size as parameter
   * @size
   * returns void
   */
  async update(size) {
    const { id } = size;
    try {
      const sizeItem = await Size.findByPk(id);

      if (!sizeItem) {
        throw new NotFoundException("Size", id.toString());
      }

      return await sizeItem?.update({ ...size });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a string as parameter
   * @id
   * returns void
   */
  async delete(id) {
    try {
      const sizeItem = await Size.findByPk(id);

      if (!sizeItem) {
        throw new NotFoundException("Size", id);
      }

      await sizeItem?.destroy({
        force: true,
      });
    } catch (error) {
      throw error;
    }
  }
}
