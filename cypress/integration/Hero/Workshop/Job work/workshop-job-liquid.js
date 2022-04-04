/// <reference types="cypress" />

context("job fiuid", () => {
    it("job fiuid", () => {
        cy.pause()
        cy.login("007", "1234")
        // AddCustomer()
        // AddTechincian()
        // liquid()

        job()
        start_job()
    })
})
const AddCustomer = () => {
    cy.get("#nav-item-6").click();
    cy.get("#tab-customer").click({ force: true });
    cy.get("#btn-addCustomer").click({ force: true });

    // กรอกข้อมูลลูกค้า
    taxAddCustomer1(getRandomNumberAddCustomer(0, 2));
    // taxAddCustomer3(getRandomNumberAddCustomer(0, 3))
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
    cy.get("#selPaymentType").click().type("{downarrow}{enter}", { force: true });
    // โอนชำระ
    //   cy.get("#selPaymentType")
    //     .click()
    //     .type("{downarrow}{downarrow}{enter}", { force: true });
    // // เช็ค
    // cy.get('#selPaymentType')
    //         .click().type("{downarrow}{downarrow}{downarrow}{downarrow}{enter}")

    cy.get("#btnSubmit").click();

    cy.get(".swal2-confirm");
    cy.get(".swal2-confirm").click();
};

const getRandomNumberAddCustomer = (min, max) => {
    0, 0;
    return Math.random() * (max - min) + min;
};
const taxAddCustomer = (textNo) => {
    cy.get("#txtTelNo").click({ force: true }).type(textNo);
};
const taxAddCustomer1 = (textNo) => {
    cy.get("#txtName")
        .type("เพิ่มลูกค้า")
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

const AddTechincian = () => {
    cy.get("#nav-item-6").click();
    cy.get("#tab-employee").click({ force: true });
    cy.get("#btn-addEmp").click({ force: true });

    taxAddEmployee(getRandomNumberAddEmployee(1, 3));
    cy.get("#roleEmp").select("ช่างซ่อม");
    taxAddEmployee2(getRandomNumberAddEmployee(1, 5));
    taxAddEmployee1(getRandomNumberAddEmployee(1, 2));
    taxAddEmployee3(getRandomNumberAddEmployee(0, 10));
    cy.get("#state-password").type("password");
    cy.get('[success=""]').click();

    cy.get(".swal2-confirm").click();

    cy.get("#nav-item-6").click();
    cy.get("#tab-employee").click({ force: true });
}
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

const job = () => {
    cy.get('#nav-item-2').click()
    cy.get('#btn-addRepairJob').click({ force: true })

    cy.wait(3000)
    cy.get('#selSelectCar').click({ force: true }).type("9กณ").type("{downarrow}{enter}")
    cy.get('#selSelectmechanicId').type("ช่างซ่อม", { force: true }).type("{downarrow}{enter}", { force: true })

    // เพิ่มอะไหล่ ของเหลว
    cy.get('.col-xl-3 > .btn').click({ force: true })
    cy.get('#tab-LIQUID').click()
    cy.wait(500)
    // cy.get('#addLiquidPo-12756').click()
    cy.pause()
    // cy.get('.el-notification__closeBtn').click()
    // cy.get('.close').click()

    // เช็ครายละเอียด
    cy.get('#dataliquid-0').contains("น้ำมันเครื่อง")
    cy.get(':nth-child(6) > .row > .mt-3 > .form-control').clear({ force: true }).click({ force: true }).type("10")
    cy.get('#pricetotal').contains("900.00")
    cy.get('#discount').clear({ force: true }).click({ force: true }).type("20", { force: true })
    cy.get('#discountPrice').click({ force: true })
    cy.wait(1000)
    cy.get('#vatPrice').contains("61.60")
    cy.get('#totalPriceFinal').contains("941.60")
    cy.get('#paymentPrice').contains("941.60")

    // เปิดงานซ่อม
    cy.get('#btncreateWalkInWorkshopJob').click()
    cy.get('.swal2-confirm').click()
}
// เริ่มซ่อมบำรุง
const start_job = () => {
    cy.wait(5000)
    cy.visit("https://herodemo.autopair.co/workshop/jobs/ATH-00289-0222-0007")
    cy.wait(5000)

    // สถานะรอซ่อมบำรุง
    cy.get('.status-border').contains("รอซ่อมบำรุง")
    cy.get('#podata-0').contains("น้ำมันเครื่อง")
    cy.get('#totalpoprice-0').contains("900.00")
    cy.get('#afterDiscount').contains("880.00")
    cy.get('#vatPrice').contains("61.60")
    cy.get('#paymentPrice').contains("941.60")

    cy.get('#btnrecheckConfirmstart').click()
    cy.get('.swal2-confirm').click()
    cy.wait(500)
    cy.get('.swal2-confirm').click()

    // สถานะกำลังซ่อมบำรุง
    cy.get('.status-border').contains("กำลังซ่อมบำรุง")
    cy.get('#podata-0').contains("น้ำมันเครื่อง")
    cy.get('#totalpoprice-0').contains("900.00")
    cy.get('#afterDiscount').contains("880.00")
    cy.get('#vatPrice').contains("61.60")
    cy.get('#paymentPrice').contains("941.60")

    cy.get('#paymentModal').click()
    cy.get('#btnrecheckConfirmfinish').click()
    cy.get('.swal2-confirm').click()
    cy.wait(2000)
    cy.get('.swal2-confirm').click()

     // สถานะซ่อมบำรุงเสร็จสิ้น
     cy.get('.status-border').contains("รายการเสร็จสิ้น")
     cy.get('#podata-0').contains("น้ำมันเครื่อง")
     cy.get('#totalpoprice-0').contains("900.00")
     cy.get('#afterDiscount').contains("880.00")
     cy.get('#vatPrice').contains("61.60")
     cy.get('#paymentPrice').contains("941.60")

     cy.get('#btnBack').click()
}
const liquid = () => {
    cy.get("#nav-item-6").click({ force: true });
    cy.get("#tab-inventory").click({ force: true });
    cy.wait(2000);
    cy.get("#btn-addInventory").click({ force: true });
    cy.get('#tab-LIQUID').click({ force: true });

    // taxliquid(getRandomNumberliquid(0, 10));
    cy.get('#lidquid-name').click().type("น้ำมันเครื่อง").type("{downarrow}{downarrow}{enter}")
    taxliquid1(getRandomNumberliquid(0, 10));
    taxliquid2(getRandomNumberliquid(0, 10));
    // taxliquid3(getRandomNumberliquid(0, 10));
    // taxliquid4(getRandomNumberliquid(0, 10));
    // cy.get(':nth-child(6) > .el-select > .el-input > .el-input__inner')
    //     .click().type("AT").type("{downarrow}{downarrow}{enter}")
    // cy.get('#liquid-oilnumber').click().type("9")
    // cy.get(':nth-child(8) > .el-select > .el-input > .el-input__inner')
    //     .click().type("SYNTHETIC").type("{downarrow}{downarrow}{enter}")

    cy.get('.row.mt-3 > :nth-child(2) > #btnNextPart').click({ force: true })

    cy.get(':nth-child(1) > #liquid-count').clear().type("500");
    cy.get('.mt-2 > #liquid-count').type("1")
    cy.get('#liquid-unit').type("อัน").type("{downarrow}{downarrow}{enter}")
    cy.get('#liquid-price').clear().type("1000");
    cy.get('#LIQUID > .col-xl-12 > .col-12 > :nth-child(3) > :nth-child(2) > #btnsaveInventoryPart').click()

    cy.get(".swal2-confirm").click();
    cy.get("#tab-TIRE").click({ force: true });
}
const getRandomNumberliquid = (min, max) => {
    0, 0;
    return Math.random() * (max - min) + min;
};
// const taxliquid = (textNo) => {
//     cy.get('#lidquid-name').type("ของเหลว").type(textNo);
// };
const taxliquid1 = (textNo) => {
    cy.get('#liquid-brand').type("ของเหลว").type(textNo);
};
const taxliquid2 = (textNo) => {
    cy.get('#liquid-manufacturerNo').type(textNo);
};
const taxliquid3 = (textNo) => {
    cy.get(':nth-child(4) > .mt-2 > #oeNo').type("ของเหลว").type(textNo);
};
const taxliquid4 = (textNo) => {
    cy.get('#liquid-fuel').type("ของเหลว").type(textNo);
};
