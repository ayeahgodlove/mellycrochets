import { Op } from "sequelize";
import { NotFoundException } from "../../exceptions/not-found.exception";
import { Crochet, CrochetSize, CrochetType, Size } from "../entities";

export class CrochetRepository {
  constructor() {}

  /**
   * Receives a Crochet as parameter
   * @crochet
   * returns void
   */
  async create(crochet) {
    try {
      return await Crochet.create({ ...crochet });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @id
   * returns Crochet
   */
  async findById(id) {
    try {
      const crochetItem = await Crochet.findByPk(id, {
        include: [
          {
            model: CrochetType,
            as: "crochetType",
          },
          {
            model: Size,
            as: "sizes",
            through: {
              attributes: ["colors"],
            },
          },
        ],
      });

      if (!crochetItem) {
        throw new NotFoundException("Crochet", id);
      }

      const formatedCrochetItem = {
        ...crochetItem.get(), // Get plain JSON
        imageUrls: JSON.parse(crochetItem.imageUrls), // Convert string to array
        sizes: crochetItem.sizes.map((size) => ({
          id: size.id,
          label: size.label,
          price: size.CrochetSize?.price,
          stock: size.CrochetSize?.stock,
        })),
      };

      return formatedCrochetItem;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @slug
   * returns Crochet
   */
  async findBySlug(slug) {
    try {
      const crochetItem = await Crochet.findOne({
        where: { slug },
        include: [
          {
            model: CrochetType,
            as: "crochetType",
          },
          {
            model: Size,
            as: "sizes",
            through: {
              attributes: ["colors"],
            },
          },
        ],
      });
      const formatedCrochetItem = {
        ...crochetItem.get(), // Get plain JSON
        imageUrls: JSON.parse(crochetItem.imageUrls), // Convert string to array
        sizes: crochetItem.sizes.map((size) => ({
          id: size.id,
          label: size.label,
          price: size.CrochetSize?.price,
          stock: size.CrochetSize?.stock,
        })),
      };
      return formatedCrochetItem;
    } catch (error) {
      throw error;
    }
  }

  /*
   * Returns an array of Crochet
   */
  async filterByIds(ids) {
    try {
      const crochets = await Crochet.findAll({
        where: {
          id: ids,
        },
        include: [
          {
            model: CrochetType,
            as: "crochetType",
          },
          {
            model: Size,
            as: "sizes",
            through: {
              attributes: ["colors"],
            },
          },
        ],
        order: [["createdAt", "DESC"]],
      });

      // Convert imageUrls to an array if it's stored as a string
      const formattedCrochets = crochets.map((crochet) => ({
        ...crochet.get(),
        imageUrls: JSON.parse(crochet.imageUrls),
        sizes: crochet.sizes.map((size) => ({
          id: size.id,
          label: size.label,
          price: size.CrochetSize?.price,
          stock: size.CrochetSize?.stock,
        })),
      }));
      return formattedCrochets;
    } catch (error) {
      throw error;
    }
  }

  /*
   * Returns an array of Crochet
   */
  async getAll() {
    try {
      const crochets = await Crochet.findAll({
        include: [
          {
            model: CrochetType,
            as: "crochetType",
          },
          {
            model: Size,
            as: "sizes",
            through: {
              attributes: ["colors"],
            },
          },
        ],
        order: [["createdAt", "DESC"]],
      });

      // Convert imageUrls to an array if it's stored as a string
      const formattedCrochets = crochets.map((crochet) => {
        const crochetData = crochet.get();
        let imageUrls = [];
        
        try {
          if (typeof crochetData.imageUrls === 'string') {
            imageUrls = JSON.parse(crochetData.imageUrls);
          } else if (Array.isArray(crochetData.imageUrls)) {
            imageUrls = crochetData.imageUrls;
          }
        } catch (e) {
          console.error("Error parsing imageUrls:", e);
          imageUrls = [];
        }

        // Ensure crochetType is a plain object
        const crochetTypeData = crochet.crochetType ? crochet.crochetType.get() : crochetData.crochetType;

        return {
          ...crochetData,
          imageUrls,
          crochetType: crochetTypeData ? {
            id: crochetTypeData.id,
            name: crochetTypeData.name,
            slug: crochetTypeData.slug,
            description: crochetTypeData.description,
            createdAt: crochetTypeData.createdAt,
            updatedAt: crochetTypeData.updatedAt,
          } : null,
          sizes: (crochet.sizes || []).map((size) => {
            const sizeData = size.get ? size.get() : size;
            return {
              id: sizeData.id,
              label: sizeData.label,
              price: size.CrochetSize?.price,
              stock: size.CrochetSize?.stock,
            };
          }),
        };
      });
      return formattedCrochets;
    } catch (error) {
      throw error;
    }
  }
  /**
   * Returns crochets with optional filters (name, crochetTypeId, sizeId, price range).
   * Same response shape as getAll().
   */
  async getAllWithFilters(filters = {}) {
    const {
      name,
      name_like,
      crochetTypeId,
      sizeId,
      minPriceCfa,
      maxPriceCfa,
      minPriceUsd,
      maxPriceUsd,
    } = filters;
    const searchName = name_like ?? name;
    const where = {};
    if (searchName && String(searchName).trim()) {
      where.name = { [Op.like]: `%${String(searchName).trim()}%` };
    }
    if (crochetTypeId && String(crochetTypeId).trim()) {
      where.crochetTypeId = String(crochetTypeId).trim();
    }
    if (minPriceCfa != null && minPriceCfa !== "") {
      where.priceInCfa = { ...(where.priceInCfa || {}), [Op.gte]: Number(minPriceCfa) };
    }
    if (maxPriceCfa != null && maxPriceCfa !== "") {
      where.priceInCfa = { ...(where.priceInCfa || {}), [Op.lte]: Number(maxPriceCfa) };
    }
    if (minPriceUsd != null && minPriceUsd !== "") {
      where.priceInUsd = { ...(where.priceInUsd || {}), [Op.gte]: Number(minPriceUsd) };
    }
    if (maxPriceUsd != null && maxPriceUsd !== "") {
      where.priceInUsd = { ...(where.priceInUsd || {}), [Op.lte]: Number(maxPriceUsd) };
    }
    const sizeInclude = sizeId && String(sizeId).trim()
      ? { model: Size, as: "sizes", through: { attributes: ["colors"] }, where: { id: String(sizeId).trim() }, required: true }
      : { model: Size, as: "sizes", through: { attributes: ["colors"] } };
    try {
      const crochets = await Crochet.findAll({
        where: Object.keys(where).length ? where : undefined,
        include: [
          { model: CrochetType, as: "crochetType" },
          sizeInclude,
        ],
        order: [["createdAt", "DESC"]],
      });
      const formattedCrochets = crochets.map((crochet) => {
        const crochetData = crochet.get();
        let imageUrls = [];
        try {
          if (typeof crochetData.imageUrls === "string") {
            imageUrls = JSON.parse(crochetData.imageUrls);
          } else if (Array.isArray(crochetData.imageUrls)) {
            imageUrls = crochetData.imageUrls;
          }
        } catch (e) {
          imageUrls = [];
        }
        const crochetTypeData = crochet.crochetType ? crochet.crochetType.get() : crochetData.crochetType;
        return {
          ...crochetData,
          imageUrls,
          crochetType: crochetTypeData
            ? {
                id: crochetTypeData.id,
                name: crochetTypeData.name,
                slug: crochetTypeData.slug,
                description: crochetTypeData.description,
                createdAt: crochetTypeData.createdAt,
                updatedAt: crochetTypeData.updatedAt,
              }
            : null,
          sizes: (crochet.sizes || []).map((size) => {
            const sizeData = size.get ? size.get() : size;
            return {
              id: sizeData.id,
              label: sizeData.label,
              price: size.CrochetSize?.price,
              stock: size.CrochetSize?.stock,
            };
          }),
        };
      });
      return formattedCrochets;
    } catch (error) {
      throw error;
    }
  }

  /*
   * Returns an array of Car
   */
  async filter(params) {
    const { crochetTypeId, sizeId } = params;
    const whereCondition = {};

    if (crochetTypeId) whereCondition.crochetTypeId = crochetTypeId;

    try {
      const crochets = await Crochet.findAll({
        where: whereCondition,
        include: [
          {
            model: CrochetType,
            as: "crochetType",
          },
          {
            model: Size,
            as: "sizes",
            through: {
              attributes: ["colors"],
            },
            // ...(sizeId ? { where: { id: sizeId } } : {}),
            where: sizeId ? { id: sizeId } : {},
          },
        ],
      });
      const formattedCrochets = crochets.map((crochet) => ({
        ...crochet.get(), // Get plain JSON
        imageUrls: JSON.parse(crochet.imageUrls), // Convert string to array
        sizes: crochet.sizes.map((size) => ({
          id: size.id,
          label: size.label,
          price: size.CrochetSize?.price,
          stock: size.CrochetSize?.stock,
        })),
      }));
      return formattedCrochets;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a Crochet as parameter
   * @crochet
   * returns void
   */
  async update(crochet) {
    const { id } = crochet;
    try {
      const crochetItem = await Crochet.findByPk(id);

      if (!crochetItem) {
        throw new NotFoundException("Crochet", id.toString());
      }

      return await crochetItem?.update({ ...crochet });
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
      const crochetItem = await Crochet.findByPk(id);

      if (!crochetItem) {
        throw new NotFoundException("Crochet", id);
      }

      await crochetItem?.destroy({
        force: true,
      });
    } catch (error) {
      throw error;
    }
  }
}
