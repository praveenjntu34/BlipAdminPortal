export class BranchSection {
    branch: Array<Branch>
    constructor(branch: Array<Branch>){
        this.branch = branch;
    }
}

export class Branch {
    branchName: string;
    sections: Array<Section>

    constructor(branchName: string){
        this.branchName = branchName;
    }
}

export class Section {
    sectionName: string;
    constructor(sectionName: string){
        this.sectionName = sectionName;
    }
}