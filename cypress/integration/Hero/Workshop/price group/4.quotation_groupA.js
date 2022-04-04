/// <reference types="cypress" />

context("quotation_groupA", () => {
    it("quotation_groupA", () => {
        cy.pause()
        cy.login("test2.2329436448013107", "1234")
        // สร้างใบเสนอราคากลุ่มราคาA
        // quotation_groupA()
        // check_quotation()

        // // เปิดงานซ่อมจากใบเสนอราคา
        // cy.pause()
        // start_job()

        // เริ่มซ่อมบำรุง
        cy.pause()
        job_finish()
    })
})
const quotation_groupA = () => {
    cy.get('#nav-item-2').click({ force: true })
    cy.wait(1000)
    cy.get('#tab-quotation').click({ force: true })
    cy.get('#btn-addRepairJob').click({ force: true })

    cy.get('#nav-item-2').click({ force: true })
    cy.wait(1000)
    cy.wait(1000)
    cy.get('#tab-quotation').click({ force: true })
    cy.get('#btn-addRepairJob').click({ force: true })

    cy.get('#selSelectCar')
        .click({ force: true }).type("9กณ").type("{downarrow}{enter}")
    cy.get('.col-xl-3 > .btn').click({ force: true })

    // ยาง
    cy.get('#trTireCatalog0 > .text-left').contains("ยางกลุ่มราคา")
    cy.get('#trTireCatalog0 > :nth-child(4)').contains("200")
    cy.get('#dotM-13038').click()
    cy.get('.el-icon-plus').click()
    cy.get('.btn-primary').click()

    // อะไหล่
    cy.wait(500)
    cy.get('#tab-PART').click()
    cy.get('#pane-PART > .d-xl-block > .table > tbody > tr > .text-left').contains("อะไหล่กลุ่มราคา")
    cy.get('#pane-PART > .d-xl-block > .table > tbody > tr > :nth-child(5)').contains("200")
    cy.get('#addSpare-13039').click()

    // แม็ก
    cy.wait(500)
    cy.get('#tab-MAG').click()
    cy.get('#pane-MAG > .d-xl-block > .table > tbody > tr > .text-left').contains("แม็กกลุ่มราคา")
    cy.get('#pane-MAG > .d-xl-block > .table > tbody > tr > :nth-child(4)').contains("200")
    cy.get('#addMagPo-13041').click()

    // ของเหลว
    cy.wait(500)
    cy.get('#tab-LIQUID').click()
    cy.get('#pane-LIQUID > .d-xl-block > .table > tbody > tr > .text-left').contains("ของเหลวกลุ่มราคา")
    cy.get('#pane-LIQUID > .d-xl-block > .table > tbody > tr > :nth-child(5)').contains("200")
    cy.get('#addLiquidPo-13040').click()

    cy.get('#Product > .modal-dialog > .modal-content > .modal-header > .close').click()

    // เช็ครายการสินค้า
    cy.get('#tiredata-0').contains("ยางกลุ่มราคา")
    cy.get('#tire-0 > #totalpricetire-0').contains("200")

    cy.get('#part-0 > #dataliquid-0').contains("อะไหล่กลุ่มราคา")
    cy.get('#listRoItemtotalprice-0').contains("200")

    cy.get('#li-0 > #dataliquid-0').contains("ของเหลวกลุ่มราคา")
    cy.get('#li-0 > #totalpricetire-0').contains("200")
    cy.get('#li-0 > :nth-child(6) > .row > .mt-3 > .form-control')
        .click({ force: true }).clear({ force: true }).type("10", { force: true })

    cy.get('#magdata-0').contains("แม็กกลุ่มราคา")
    cy.get('#mag-0 > #totalpricetire-0').contains("200")
    cy.get('#mag-0 > :nth-child(6) > .row > .mt-3 > .form-control')
        .click({ force: true }).clear({ force: true }).type("10", { force: true })

    // เช็คคำนวณ
    cy.get('#afterDiscount').should("contain.text", "760.00")
    cy.get('#vatPrice').should("contain.text", "53.20")
    cy.get('#paymentPrice').should("contain.text", "813.20")

    check()

    // เปิดใบเสนอราคา
    cy.get('#btncreateQuotation').click()
    cy.get('.swal2-confirm').click()
}
const check_quotation = () => {
    cy.get('#jobrepair-0 > :nth-child(2)').should("contain.text", "ลูกค้ากลุ่มราคา")
    cy.get('#jobrepair-0 > :nth-child(5)').should("contain.text", "760.00")
    cy.get('#jobrepair-0 > :nth-child(8) > .status-border').should("contain.text", "รอลูกค้ายืนยัน")
}
const start_job = () => {
    cy.wait(3000)
    cy.visit("https://herodemo.autopair.co/workshop/quotation/info/43")

    cy.get('.status-border').should("contain.text", "รอลูกค้ายืนยัน")

    // เช็ครายการสินค้า
    cy.get('#podata-0').contains("ยางกลุ่มราคา")
    cy.get('#totalpricetire-0').contains("200")

    cy.get('#podata-1').contains("อะไหล่กลุ่มราคา")
    cy.get('#totalpricetire-1').contains("200")

    cy.get('#podata-3').contains("ของเหลวกลุ่มราคา")
    cy.get('#totalpricetire-3').contains("180")

    cy.get('#podata-2').contains("แม็กกลุ่มราคา")
    cy.get('#totalpricetire-2').contains("180")

    // เช็คคำนวณ
    cy.get('#afterDiscount').should("contain.text", "760.00")
    cy.get('#vatPrice').should("contain.text", "53.20")
    cy.get('#paymentPrice').should("contain.text", "813.20")

    check()

    // เปิดงานซ่อมจากใบเสนอราคา
    cy.get('#btngotoCreate').click()
    cy.get('#selSelectmechanicId').click({ force: true }).type("ช่างซ่อม", { force: true }).type("{downarrow}{enter}", { force: true })

    // เช็ครายการสินค้า เปิดงานซ่อมจากใบเสนอราคา
    cy.get('#tiredata-0').contains("ยางกลุ่มราคา")
    cy.get('#totalpricetireenduser-0').contains("200")

    cy.get('#datapart-0').contains("อะไหล่กลุ่มราคา")
    cy.get('#part-0 > #partproductlatestSalePricetotal-0').contains("200")

    cy.get('#dataliquid-0').contains("ของเหลวกลุ่มราคา")
    cy.get('#li-0 > #partproductlatestSalePricetotal-0').contains("180")

    cy.get('#magdata-0').contains("แม็กกลุ่มราคา")
    cy.get('#mag-0 > #partproductlatestSalePricetotal-0').contains("180")

    //  เปิดงานซ่อม
    cy.get('#btncreateWalkInWorkshopJob').click()
    cy.get('.swal2-confirm').click()

    // เช็ครายการงานซ่อม
    cy.get('#jobrepair-0 > :nth-child(2)').should("contain.text", "ลูกค้ากลุ่มราคา")
    cy.get('#jobrepair-0 > :nth-child(6)').should("contain.text", "813.20")
    cy.get('[style="width: 12rem;"] > .status-border').should("contain.text", "รอซ่อมบำรุง")
}
const job_finish = () => {
    cy.wait(3000)
    cy.visit("https://herodemo.autopair.co/workshop/jobs/ATH-00294-0322-0021")
    cy.wait(2000)

    // รอซ่อมบำรุง
    cy.get('.status-border').contains("รอซ่อมบำรุง")
    // ยาง
    cy.get('#podata-0').contains("ยางกลุ่มราคา")
    cy.get('#po-0 > :nth-child(6)').contains("200")

    // อะไหล่
    cy.get('#podata-1').contains("อะไหล่กลุ่มราคา")
    cy.get('#totalpoprice-1').contains("200")

    // แม็ก
    cy.get('#podata-2').contains("แม็กกลุ่มราคา")
    cy.get('#totalpoprice-2').contains("180")

    // ของเหลว
    cy.get('#podata-3').contains("ของเหลวกลุ่มราคา")
    cy.get('#totalpoprice-3').contains("180")

    // เช็คคำนวณ
    cy.get('#afterDiscount').contains("760.00")
    cy.get('#vatPrice').contains("53.20")
    cy.get('#paymentPrice').contains("813.20")

    cy.get('#btnrecheckConfirmstart').click()
    cy.get('.swal2-confirm').click()
    cy.wait(500)
    cy.get('.swal2-confirm').click()

    // กำลังซ่อมบำรุง
    cy.get('.status-border').contains("กำลังซ่อมบำรุง")
    // ยาง
    cy.get('#podata-0').contains("ยางกลุ่มราคา")
    cy.get('#po-0 > :nth-child(6)').contains("200")

    // อะไหล่
    cy.get('#podata-1').contains("อะไหล่กลุ่มราคา")
    cy.get('#totalpoprice-1').contains("200")

    // แม็ก
    cy.get('#podata-2').contains("แม็กกลุ่มราคา")
    cy.get('#totalpoprice-2').contains("180")

    // ของเหลว
    cy.get('#podata-3').contains("ของเหลวกลุ่มราคา")
    cy.get('#totalpoprice-3').contains("180")

    // เช็คคำนวณ
    cy.get('#afterDiscount').contains("760.00")
    cy.get('#vatPrice').contains("53.20")
    cy.get('#paymentPrice').contains("813.20")

    cy.get('#paymentModal').click()
    cy.get('#btnrecheckConfirmfinish').click()
    cy.get('.swal2-confirm').click()
    cy.wait(500)
    cy.get('.swal2-confirm').click()

    // รายการเสร็จสิ้น
    cy.get('.status-border').contains("รายการเสร็จสิ้น")
    // ยาง
    cy.get('#podata-0').contains("ยางกลุ่มราคา")
    cy.get('#po-0 > :nth-child(6)').contains("200")

    // อะไหล่
    cy.get('#podata-1').contains("อะไหล่กลุ่มราคา")
    cy.get('#totalpoprice-1').contains("200")

    // แม็ก
    cy.get('#podata-2').contains("แม็กกลุ่มราคา")
    cy.get('#totalpoprice-2').contains("180")

    // ของเหลว
    cy.get('#podata-3').contains("ของเหลวกลุ่มราคา")
    cy.get('#totalpoprice-3').contains("180")

    // เช็คคำนวณ
    cy.get('#afterDiscount').contains("760.00")
    cy.get('#vatPrice').contains("53.20")
    cy.get('#paymentPrice').contains("813.20")

    check()

    cy.get('#btnBack').click()

    // เช็ครายการงานซ่อม
    cy.get('#jobrepair-0 > :nth-child(2)').should("contain.text", "ลูกค้ากลุ่มราคา")
    cy.get('#jobrepair-0 > :nth-child(6)').should("contain.text", "813.20")
    cy.get('[style="width: 12rem;"] > .status-border').should("contain.text", "รายการเสร็จสิ้น")
}

const check = () => {
    const job = [
        {
            price: 200,
            qty: 1,
            discount: 0,
        },
        {
            price: 200,
            qty: 1,
            discount: 0,
        },
        {
            price: 200,
            qty: 1,
            discount: 20,
        },
        {
            price: 200,
            qty: 1,
            discount: 20,
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
        discount += job.price - job.discount
    })
    // // ส่วนลดท้ายบิล ถ้ามี
    // let job_discount = 0
    // job.map(job => {
    //     job_discount += (job.price - job.discount) * (100 - 10) / 100
    // })
    // ราคาบวก vat ท้ายบิล
    let paymentPrice = 0
    job.map(job => {
        paymentPrice += (job.price - job.discount) * 1.07
    })

    cy.log(Price)
    cy.log(discount)
    // cy.log(job_discount)
    cy.log(paymentPrice)

    cy.get('#afterDiscount').contains(discount)
    cy.get('#paymentPrice').contains(paymentPrice)

}