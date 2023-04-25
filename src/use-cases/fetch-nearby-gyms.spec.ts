import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { expect, describe, it, beforeEach } from 'vitest';
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms';

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe('Fetch Nearby Gyms Use Case', () => {
    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository();
        sut = new FetchNearbyGymsUseCase(gymsRepository);
    });

    it('Should be able to fetch nearby gyms', async () => {
        await gymsRepository.create({
            title: 'Near Gym',
            description:null,
            phone: null,
            latitude: -23.530363,
            longitude: -46.3976372
        });
        await gymsRepository.create({
            title: 'Far Gym',
            description:null,
            phone: null,
            latitude: -23.4779073,
            longitude: -46.6680691
        });

        const{ gyms } = await sut.execute({
            userLatitude: -23.530363,
            userLongitude: -46.3976372
        });

        expect(gyms).toHaveLength(1);
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'Near Gym'}),
        ]);
    });
});