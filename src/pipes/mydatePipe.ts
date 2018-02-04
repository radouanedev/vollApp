import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name:"mydate"
})

export class MydatePipe implements PipeTransform{

    transform(value: string, fallback: string[]): string {

        if(!value)
            return null;

        let millis = parseInt(value);

        let date = new Date(millis);

        let dateString = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();

        return dateString;

    }

}


@Pipe({
    name:"mytime"
})

export class MytimePipe implements PipeTransform{

    transform(value: string, fallback: string[]): string {

        if(!value)
            return null;

        let millis = parseInt(value);

        let date = new Date(millis);

        let timeString = date.getHours() + ":" + date.getMinutes();

        return timeString;

    }

}
