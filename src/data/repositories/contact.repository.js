import { NotFoundException } from "../../exceptions/not-found.exception";
import { Contact } from "../entities";

export class ContactRepository {
  constructor() {}

  /**
   * Receives a Contact as parameter
   * @contact
   * returns void
   */
  async create(contact) {
    try {
      return await Contact.create({ ...contact });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @id
   * returns Contact
   */
  async findById(id) {
    try {
      const contactItem = await Contact.findByPk(id);

      if (!contactItem) {
        throw new NotFoundException("Contact", id);
      }
      return contactItem;
    } catch (error) {
      throw error;
    }
  }

  /*
   * Returns an array of Contact
   */
  async getAll() {
    try {
      const contacts = await Contact.findAll({
        order: [["createdAt", "DESC"]],
      });
      return contacts;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a Contact as parameter
   * @contact
   * returns void
   */
  async update(contact) {
    const { id } = contact;
    try {
      const contactItem = await Contact.findByPk(id);

      if (!contactItem) {
        throw new NotFoundException("Contact", id.toString());
      }

      return await contactItem?.update({ ...contact });
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
      const contactItem = await Contact.findByPk(id);

      if (!contactItem) {
        throw new NotFoundException("Contact", id);
      }

      await contactItem?.destroy({
        force: true,
      });
    } catch (error) {
      throw error;
    }
  }
}
