import supertest from 'supertest';
import express from 'express';

describe('Retornar lista da agenda', () => {
    describe('GET /agendados', () => {
        test('Deve retornar status 200', async() => {
            try {
                await supertest(express)
                    .get('localhost:8080/agendados')
                    .expect(200);
            } catch(error) {
                console.log(error);
            }
        });
    });
});
