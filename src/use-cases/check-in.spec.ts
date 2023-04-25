import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { Decimal } from '@prisma/client/runtime/library';
import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest';
import { CheckInUseCase } from './check-in';
import { MaxDistanceError } from './errors/max-distance-error';
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error';

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe('Check In Use Case', () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository();
        gymsRepository = new InMemoryGymsRepository();
        sut = new CheckInUseCase(checkInsRepository, gymsRepository);

        await gymsRepository.create({
            id: 'gym-01',
            description: 'test',
            title: 'academy',
            phone: '119999999',
            latitude: -23.530363,
            longitude: -46.3976372
        });

        vi.useFakeTimers();
    });
    afterEach(() => {
        vi.useRealTimers();
    });

    it('Should be able to check in', async () => {
        const{ checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -23.530363,
            userLongitude: -46.3976372
        });

        expect(checkIn.id).toEqual(expect.any(String));
    });

    it('Should not be able to check in twice in the same day', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -23.530363,
            userLongitude: -46.3976372
        });

        await expect(() => sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -23.530363,
            userLongitude: -46.3976372
        })).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
    });

    it('Should be able to check in twice but in different days', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -23.530363,
            userLongitude: -46.3976372
        });

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -23.530363,
            userLongitude: -46.3976372
        });

        expect(checkIn.id).toEqual(expect.any(String));
    });

    it('Should not be able to check in on distant gym', async () => {
        await gymsRepository.create({
            id: 'gym-02',
            description: 'user-01',
            title: 'academy',
            phone: '119999999',
            latitude: -23.4276163,
            longitude: -46.1895146
        });

        await expect(() => sut.execute({
            gymId: 'gym-02',
            userId: 'user-01',
            userLatitude: -23.530363,
            userLongitude: -46.3976372
        })).rejects.toBeInstanceOf(MaxDistanceError);
    });
});