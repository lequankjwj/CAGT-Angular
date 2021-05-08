import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'anphabet' })
export class AnphabetPipe implements PipeTransform {
    transform(index: number): string {
        const alphabetNumber = index + 65;
        if (alphabetNumber > 90) {
            return;
        }

        return String.fromCharCode(alphabetNumber);
    }
}
