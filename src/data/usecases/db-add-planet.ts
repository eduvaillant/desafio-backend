import { PlanetModel } from '../../domain/models'
import { AddPlanet, AddPlanetParams } from '../../domain/usecases'
import { AddPlanetRepository, AddPlanetRepositoryParams, LoadPlanetByNameRepository } from '../protocols'
import { SwapiClient } from '../protocols/swapi-client'
import { InvalidPlanetTerrainError, InvalidPlanetNameError, InvalidPlanetClimateError, PlanetAlreadyExistsError } from '../errors'

export class DbAddPlanet implements AddPlanet {
  constructor (
    private readonly loadPlanetByNameRepository: LoadPlanetByNameRepository,
    private readonly swapiClient: SwapiClient,
    private readonly addPlanetRepository: AddPlanetRepository
  ) {}

  async add (addPlanetParams: AddPlanetParams): Promise<PlanetModel> {
    const loadedPlanet = await this.loadPlanetByNameRepository.loadByName(addPlanetParams.name.toLowerCase())
    if (loadedPlanet) {
      throw new PlanetAlreadyExistsError()
    }

    const result = await this.swapiClient.search(addPlanetParams.name)
    if (!result) {
      throw new InvalidPlanetNameError()
    }

    if (result.name !== addPlanetParams.name) {
      throw new InvalidPlanetNameError()
    }

    if (result.terrain !== addPlanetParams.terrain) {
      throw new InvalidPlanetTerrainError()
    }

    if (result.climate !== addPlanetParams.climate) {
      throw new InvalidPlanetClimateError()
    }

    const addPlanetRepositoryParams: AddPlanetRepositoryParams = {
      name: addPlanetParams.name.toLowerCase(),
      climate: addPlanetParams.climate.toLowerCase(),
      terrain: addPlanetParams.terrain.toLowerCase(),
      movie_apparitions: result.movie_apparitions
    }

    const createdPlanet = await this.addPlanetRepository.add(addPlanetRepositoryParams)

    return createdPlanet
  }
}
