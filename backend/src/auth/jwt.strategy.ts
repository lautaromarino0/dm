import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';  
import { jwtConstants } from "./jwt.constant";

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
        secretOrKey: jwtConstants.secret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        });
    }

    async validate(payload: any){
        return { username: payload.username, id: payload.id };
    }
}