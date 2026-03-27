
/* SortAnalyzer class */
class SortAnalyzer {
  private numbers: number[];

  constructor(numbers: number[]) {
    this.numbers = numbers;
  }

  /* Returns the original list of numbers.*/
  public getOriginalNumbers(): number[] {
    return this.numbers;
  }

  /* Uses quicksort to return a sorted list.*/
  public getSortedNumbers(): number[] {
    return this.quickSort(this.numbers);
  }

  /* Recursive quicksort function.*/ 
  private quickSort(numbers: number[]): number[] {
    // stopping condition
    if (numbers.length <= 1) {
      return numbers;
    }

    const pivot: number = numbers[0]!;
    // Lists
    const left: number[] = [];
    const right: number[] = [];

    // Loop through the rest of the list, start at index 1 because 0 is the pivot
    for (let i = 1; i < numbers.length; i++) {
    // Compare each number with pivot
      if (numbers[i]! < pivot) {
        // If number < pivot, goes into left
        left.push(numbers[i]!);
      } else {
        // If number > pivot, goes into right
        right.push(numbers[i]!);
      }
    }

    // use the spread operator for merge arrays together(recursion happens)
    return [...this.quickSort(left), pivot, ...this.quickSort(right)];
  }

  /* Returns the amount of numbers in the list.*/
  public getCount(): number {
    return this.numbers.length;
  }

  /* Returns the smallest number in the list. */
  public getSmallestNumber(): number {
    return Math.min(...this.numbers);
  }

  /* Returns the largest number in the list. */
  public getLargestNumber(): number {
    return Math.max(...this.numbers);
  }

  /* Returns the average of all numbers in the list. */
  public getAverage(): number {
    const total = this.numbers.reduce((sum, current) => sum + current, 0);
    return total / this.numbers.length;
  }

  /* Prints all results to the terminal.*/
  public printReport(): void {
    console.log("Original list:", this.getOriginalNumbers());
    console.log("Sorted list:", this.getSortedNumbers());
    console.log("Total numbers:", this.getCount());
    console.log("Smallest number:", this.getSmallestNumber());
    console.log("Largest number:", this.getLargestNumber());
    console.log("Average:", this.getAverage());
  }
}

/* Verifies the valid Numbers*/
function validateNumbers(numbers: number[]): void {
  if (numbers.length === 0) {
    throw new Error("The list cannot be empty.");
  }

  for (const number of numbers) {
    if (!Number.isFinite(number)) {
      throw new Error("The list contains an invalid number.");
    }
  }
}

/* async function requirement.*/
async function loadNumbers(): Promise<number[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([25, 10, 8, 42, 3, 17, 29, 1, 13, 5, 33, 6]);
    }, 1000);
  });
}

async function loadSecondNumbers(): Promise<number[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([99, 12, 54, 2, 78, 45, 31, 7]);
    }, 1000);
  });
}

/* Prints a title in the terminal.*/
function printSectionTitle(title: string): void {
  console.log("\n==============================");
  console.log(title);
  console.log("==============================");
}

/* Main program function.*/
async function main(): Promise<void> {
  try {
    printSectionTitle("Quicksort Project");

    console.log("Loading first list asynchronously...");
    const firstNumbers = await loadNumbers();

    validateNumbers(firstNumbers);

    const firstAnalyzer = new SortAnalyzer(firstNumbers);

    printSectionTitle("First List Analysis");
    firstAnalyzer.printReport();

    console.log("Loading second list asynchronously...");
    const secondNumbers = await loadSecondNumbers();

    validateNumbers(secondNumbers);

    const secondAnalyzer = new SortAnalyzer(secondNumbers);

    printSectionTitle("Second List Analysis");
    secondAnalyzer.printReport();

    printSectionTitle("Program Finished Successfully");
  } catch (error) {
    if (error instanceof Error) {
      console.error("An error occurred:", error.message);
    } else {
      console.error("An unknown error occurred.");
    }
  }
}

main();