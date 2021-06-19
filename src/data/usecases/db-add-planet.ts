import { InvalidaPlanetNameError } from '../errors/invalid-planet-name-error'
import { PlanetModel } from '../../domain/models'
import { AddPlanet, AddPlanetParams } from '../../domain/usecases'
import { LoadPlanetByNameRepository } from '../protocols'
import { SwapiClient } from '../protocols/swapi-client'

export class DbAddPlanet implements AddPlanet {
  constructor (
    private readonly loadPlanetByNameRepository: LoadPlanetByNameRepository,
    private readonly swapiClient: SwapiClient
  ) {}

  async add (addPlanetParams: AddPlanetParams): Promise<PlanetModel> {
    const loadedPlanet = await this.loadPlanetByNameRepository.loadByName(addPlanetParams.name)
    if (loadedPlanet) {
      return null
    }
    const result = await this.swapiClient.search(addPlanetParams.name)
    if (!result) {
      throw new InvalidaPlanetNameError()
    }

    return null
  }
}