export class BranchSection {
    sections: Array<string>
    constructor(sections: Array<string>){
        this.sections = sections;
    }
}

export class Branch {
    branchId: number;
    branchName: string;
  sections: any;
    constructor(branchId:number,branchName: string){
        this.branchId = branchId;
        this.branchName = branchName;
    }
}


