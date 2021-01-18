import express from "express";
import BaseController from "../utils/BaseController";
import { cardsService } from "../services/AnimalsService.js";
import auth0Provider from "@bcwdev/auth0provider";

export class AnimalsController extends BaseController {
  constructor() {
    super('api/cards');
    this.router
      .get('', this.getAllCards)
      .use(auth0Provider.getAuthorizedUserInfo)
      .get('/:id', this.getById)
      .post('', this.create)
      .delete('/:id', this.deleteCard);
  }

  async getAllCards(req, res, next) {
    try {
      let data = await cardsService.findAll(req.query);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async getById(req, res, next) {
    try {
      let data = await cardsService.findById(req.params.id);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      if (req.body == []) {
        let data = await cardsService.createMany(req.body);
        return res.status(201).send(data);
      }
      let data = await cardsService.create(req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }
  async deleteCard(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email.toLowerCase();
      await cardsService.deleteById(req.params.id, req.body.creatorEmail);
      return res.send('Successfully Deleted!');
    } catch (error) {
      next(error);
    }
  }
}