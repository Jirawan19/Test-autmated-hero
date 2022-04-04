/// <reference types="cypress" />

context("tries_po", () => {
    it("quotation tries", () => {
        cy.pause()
        cy.login("test2.2329436448013107", "1234");
        // add_tries()
        quotation()
    })
    it("start_job", () => {
        cy.pause()
        cy.login("test2.2329436448013107", "1234");
        start_job()
    })
    it("start_job1", () => {
        cy.pause()
        cy.login("test2.2329436448013107", "1234");
        start_job1()
        check_job()
    })
})
const add_tries = () => {
    cy.get("#nav-item-6").click({ force: true });
    cy.get("#tab-inventory").click({ force: true });
    cy.wait(2000);
    cy.get("#btn-addInventory").click({ force: true });
    cy.get("#tab-TIRE").click({ force: true });

    taxCartiees(getRandomNumberCartiees(0, 10));
    taxCartiees1(getRandomNumberCartiees(0, 10));
    taxCartiees2(getRandomNumberCartiees(0, 10));
    taxCartiees3(getRandomNumberCartiees(0, 10));
    taxCartiees4(getRandomNumberCartiees(0, 10));

    cy.get("#txtSelectWidth").click().type("{downarrow}{downarrow}{enter}");
    cy.get("#txtSelectSeries").click().type("10.5").type("{downarrow}{downarrow}{enter}");
    cy.get("#txtSelectRim").click().type("{downarrow}{downarrow}{enter}");

    cy.get("#btnnextTirestep").click();

    cy.get("#salesPriceTire").clear().type("100");
    cy.get('#tiredot-0').clear().type("0319");
    cy.get('#tireamount-0').clear().type("50");
    cy.get("#saveInventoryTire").click();

    cy.get(".swal2-confirm").click();
    cy.get("#tab-TIRE").click({ force: true });
}
const getRandomNumberCartiees = (min, max) => {
    0, 0;
    return Math.random() * (max - min) + min;
};
const taxCartiees = (textNo) => {
    cy.get("#ItemCodeTire").type("เพิ่มยาง").type(textNo);
};
const taxCartiees1 = (textNo) => {
    cy.get("#brandTire").type("เพิ่มยาง").type(textNo);
};
const taxCartiees2 = (textNo) => {
    cy.get("#itemtagTire").type("เพิ่มยาง").type(textNo);
};
const taxCartiees3 = (textNo) => {
    cy.get("#skuTire").type("เพิ่มยาง").type(textNo);
};
const taxCartiees4 = (textNo) => {
    cy.get("#itemDescriptionTire").type("เพิ่มยาง").type(textNo);
};
const quotation = () => {
    cy.get('#nav-item-2').click()
    cy.get('#tab-quotation').click({ force: true })

    cy.wait(2000)
    cy.get('#btn-addRepairJob').click({ force: true })
    cy.get('#selSelectCar').click({ force: true }).type("9กณ").type("{downarrow}{enter}")

    // เพิ่มสินค้า
    cy.get('.col-xl-3 > .btn').click({ force: true })
    cy.get('#trTireCatalog0 > .text-left').contains("เพิ่มยาง")
    cy.get('#trTireCatalog0 > :nth-child(2)').contains("เพิ่มยาง")
    cy.get('#dotM-13043').click({ force: true })
    cy.get('#dotModal-13043 > .modal-dialog > .modal-content > .modal-body > .table > tbody > tr > :nth-child(3) > #amount-0 > .el-input-number__increase > .el-icon-plus')
        .click({ force: true }).click({ force: true })
    cy.get('#dotModal-13043 > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click()
    cy.get('#Product > .modal-dialog > .modal-content > .modal-header > .close').click()

    cy.get('#discount').click({ force: true }).clear({ force: true }).type("10", { force: true })
    cy.get('#discountPrice').click({ force: true })

    cy.get('#totalpricetire-0').contains("200.00")
    cy.get('#afterDiscount').contains("190.00")
    cy.get('#paymentPrice').contains("203.30")

    check()

    cy.get(':nth-child(1) > .calculator-form > #txtNote').click().type("test")

    // เปิดใบเสนอราคา
    cy.get('#btncreateQuotation').click()
    cy.get('.swal2-confirm').click()

    // เช็ครายการใบเสนอราคา
    cy.get('#jobrepair-0 > :nth-child(2)').should("contain.text", "ลูกค้า")
    cy.get('#jobrepair-0 > :nth-child(5)').should("contain.text", "190.00")
    cy.get('#jobrepair-0 > :nth-child(8) > .status-border').should("contain.text", "รอลูกค้ายืนยัน")
}
const check = () => {
    const job = [
        {
            price: 100,
            qty: 2,
            discount: 10,
        }
    ]

    // ราคาทั้งหมด
    let Price = 0
    job.map(job => {
        Price += job.price * job.qty
    })
    // ส่วนลดรายชิ้น
    let discount = 0
    job.map(job => {
        discount += (job.price * job.qty) - job.discount
    })
    // // ส่วนลดท้ายบิล ถ้ามี
    // let job_discount = 0
    // job.map(job => {
    //     job_discount += (job.price - job.discount) * (100 - 10) / 100
    // })

    // ราคาบวก vat ท้ายบิล
    let paymentPrice = 0
    job.map(job => {
        paymentPrice += ((job.price * job.qty) - job.discount) * 1.07
    })

    cy.log(Price)
    cy.log(discount)
    // cy.log(job_discount)
    cy.log(paymentPrice)

    cy.get('#afterDiscount').contains(discount)
    cy.get('#paymentPrice').contains(paymentPrice)

}
// เปิดงานซ่อมบำรุงจากใบเสนอราคา
const start_job = () => {
    cy.wait(1000)
    cy.visit("https://herodemo.autopair.co/workshop/quotation/info/77")
    cy.wait(1000)

    // สถานะรอลูกค้ายืนยัน
    cy.get('.status-border').contains("รอลูกค้ายืนยัน")
    cy.get('#podata-0').contains("เพิ่มยาง")
    cy.get('#totalPrice').contains("200.00")
    cy.get('#afterDiscount').contains("190.00")
    cy.get('#paymentPrice').contains("203.30")
    check()

    cy.get('#btngotoCreate').click()

    // ใส่ข้อมูลพนักงานซ่อม
    cy.get('#selSelectmechanicId').click({ force: true }).type("ช่างซ่อม", { force: true }).type("{downarrow}{downarrow}{enter}", { force: true })

    cy.get('#tiredata-0').contains("เพิ่มยาง")
    cy.get('#totalpricetireenduser-0').contains("200.00")
    cy.get('#afterDiscount').contains("190.00")
    cy.get('#paymentPrice').contains("203.30")
    check()

    // เปิดงานซ่อม
    cy.get('#btncreateWalkInWorkshopJob').click({ force: true })
    cy.get('.swal2-confirm').click()

    // เช็คเปิดงานซ่อมจากใบเสนอราคา
    cy.get('#tab-งานซ่อม').click({ force: true })
    cy.get('#jobrepair-0 > :nth-child(2)').should("contain.text", "ลูกค้า")
    cy.get('#jobrepair-0 > :nth-child(6)').should("contain.text", "203.30")
    cy.get('#jobrepair-0 > [style="width: 12rem;"] > .status-border').should("contain.text", "รอซ่อมบำรุง")
}
const start_job1 = () => {
    cy.wait(1000);
    cy.visit("https://herodemo.autopair.co/workshop/jobs/ATH-00294-0322-0043")
    cy.wait(1000);

    // สถานะรอซ่อมบำรุง
    cy.get('.status-border').contains("รอซ่อมบำรุง")
    cy.get('#podata-0').contains("เพิ่มยาง")
    cy.get('#totalPrice').contains("200.00")
    cy.get('#afterDiscount').contains("190.00")
    cy.get('#paymentPrice').contains("203.30")
    check()

    cy.get('#btnrecheckConfirmstart').click()
    cy.get('.swal2-confirm').click()
    cy.wait(500);
    cy.get('.swal2-confirm').click()

    // สถานะกำลังซ่อมบำรุง
    cy.get('.status-border').contains("กำลังซ่อมบำรุง")
    cy.get('#podata-0').contains("เพิ่มยาง")
    cy.get('#totalPrice').contains("200.00")
    cy.get('#afterDiscount').contains("190.00")
    cy.get('#paymentPrice').contains("203.30")
    check()

    cy.get('#paymentModal').click()
    cy.get('#btnrecheckConfirmfinish').click()
    cy.get('.swal2-confirm').click()
    cy.wait(2000)
    cy.get('.swal2-confirm').click()

    // สถานะซ่อมบำรุงเสร็จสิ้น
    cy.get('.status-border').contains("รายการเสร็จสิ้น")
    cy.get('#podata-0').contains("เพิ่มยาง")
    cy.get('#totalPrice').contains("200.00")
    cy.get('#afterDiscount').contains("190.00")
    cy.get('#paymentPrice').contains("203.30")
    check()

    cy.get('#btnBack').click()
}
const check_job = () => {
    cy.get('#jobrepair-0 > :nth-child(2)').contains("ลูกค้า")
    cy.get('#jobrepair-0 > :nth-child(6)').contains("203.30")
    cy.get('#jobrepair-0 > [style="width: 12rem;"] > .status-border').contains("รายการเสร็จสิ้น")
}