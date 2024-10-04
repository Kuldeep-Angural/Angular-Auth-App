
export class UtilityService {
   
    addDelay = (delay: number) => {
        return new Promise(res => setTimeout(res, delay ? delay : 0));
    }
}