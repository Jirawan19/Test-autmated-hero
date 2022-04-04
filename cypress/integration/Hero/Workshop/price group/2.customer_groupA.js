/// <reference types="cypress" />

context("customer", () => {
    it("group A", () => {
        cy.pause()
        cy.login("test2.2329436448013107", "1234");

        // เพิ่มลูกค้ากลุ่มราคา
        customer_groupA()

        // เพิ่มช่างซ่อม
        // AddTechincian()
    })
})
const customer_groupA = () => {
    cy.get("#nav-item-6").click();
    cy.get("#tab-customer").click({ force: true });
    cy.get("#btn-addCustomer").click({ force: true });

    // กรอกข้อมูลลูกค้า
    taxAddCustomer1(getRandomNumberAddCustomer(0, 2));
    cy.get("#txtIdCardNumber").click({ force: true }).type("1100201520688");
    taxAddCustomer(getRandomNumberAddCustomer(0, 12))
    cy.get("#txtAddress").click({ force: true }).type("168/106");
    cy.get("#txtDistrict > .vth-addr-input-container > .vth-addr-input")
        .click({ force: true })
        .type("คลองถนน");
    cy.get("#txtPostCode > .vth-addr-input-container > .vth-addr-input")
        .clear()
        .click({ force: true })
        .type("10220")
        .type("{enter}");
    cy.get("#txtSubDistrict > .vth-addr-input-container > .vth-addr-input")
        .clear()
        .click({ force: true })
        .type("สายไหม")
        .type("{enter}");
    taxAddCustomer6(getRandomNumberAddCustomer(0, 10));
    cy.get("#step0 > .row > .step_row_footer > .btn-select").click();

    // กรอกข้อมูลรถยนต์
    taxAddCustomer4(getRandomNumberAddCustomer(1, 3));
    taxAddCustomer5(getRandomNumberAddCustomer(0, 5));
    cy.get("#selCarBrand")
        .click()
        .type("{downarrow}{downarrow}{enter}", { force: true });
    cy.get("#input_carModel")
        .click()
        .wait(500)
        .type("{downarrow}{downarrow}{downarrow}{enter}", { force: true });
    cy.get("#step2-province")
        .click({ force: true })
        .type("{downarrow}{downarrow}{downarrow}{enter}", { force: true });

    cy.get("#selCartype")
        .click({ force: true })
        .type("{downarrow}{downarrow}{downarrow}{enter}", { force: true });

    cy.get("#selCarYear")
        .click({ force: true })
        .type("{downarrow}{downarrow}{downarrow}{enter}", { force: true });
    cy.get("#selCarGear")
        .click({ force: true })
        .type("{downarrow}{downarrow}{downarrow}{enter}", { force: true });
    cy.get("#latestMileages").click({ force: true });
    cy.wait(2000);

    cy.get("#btnNext-2").click({ force: true });

    // ชำระเงินสด
    cy.wait(2000);
    cy.get('#selCustomergroup').click().type("{downarrow}{enter}", { force: true });
    cy.get("#selPaymentType").click().type("{downarrow}{enter}", { force: true });
    cy.get("#btnSubmit").click();

    cy.get(".swal2-confirm");
    cy.get(".swal2-confirm").click();

    cy.get('#nav-item-6').click()
    
}
const getRandomNumberAddCustomer = (min, max) => {
    0, 0;
    return Math.random() * (max - min) + min;
};
const taxAddCustomer = (textNo) => {
    cy.get("#txtTelNo").click({ force: true }).type(textNo);
};
const taxAddCustomer1 = (textNo) => {
    cy.get("#txtName")
        .type("ลูกค้ากลุ่มราคา")
        .type(textNo)
        .tab()
        .tab()
        .tab()
        .tab()
        .wait(1000)
        .type("0955915150");
};
const taxAddCustomer2 = (textNo) => {
    cy.get(".bv-no-focus-ring > #idCardNumber").click().type("1100201520688");
};
const taxAddCustomer3 = (textNo) => {
    cy.get("#txtMobileNo").click().type(textNo);
};
const taxAddCustomer6 = (textNo) => {
    cy.get("#email").click().type("test").type(textNo).type("@gmail.com");
};
const taxAddCustomer4 = (textNo) => {
    cy.get("#txtCarRegistrationNumber").click().type("9กณ").type(textNo);
};
const taxAddCustomer5 = (textNo) => {
    cy.get("#vinNos").click().type(textNo);
};

// เข้าหน้าเพิ่มพนักงาน
const AddTechincian = () => {
    cy.get("#nav-item-6").click();
    cy.get("#tab-employee").click({ force: true });
    cy.get("#btn-addEmp").click({ force: true });

    // กรอกข้อมูลพนักงาน
    taxAddEmployee(getRandomNumberAddEmployee(1, 3));
    cy.get("#roleEmp").select("ช่างซ่อม");
    taxAddEmployee2(getRandomNumberAddEmployee(1, 5));
    taxAddEmployee1(getRandomNumberAddEmployee(1, 2));
    taxAddEmployee3(getRandomNumberAddEmployee(0, 10));
    cy.get("#state-password").type("password");
    cy.get('[success=""]').click();

    cy.get(".swal2-confirm").click();
};
const getRandomNumberAddEmployee = (min, max) => {
    0, 0;
    return Math.random() * (max - min) + min;
};
const taxAddEmployee = (textNo) => {
    cy.get("#state-nameEmp").type("ช่างซ่อม").type(textNo);
};
const taxAddEmployee1 = (textNo) => {
    cy.get("#state-usernameEmp").type("ช่างซ่อม").type(textNo);
};
const taxAddEmployee2 = (textNo) => {
    cy.get("#state-emailEmp")
        .type("ช่างซ่อม")
        .type(textNo)
        .type("@gmail.com");
};
const taxAddEmployee3 = (textNo) => {
    cy.get("#state-telEmp").type(textNo);
};